import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Phone, Monitor, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useWebSocket from "@/hooks/useWebSocket";
import Webcam from "react-webcam";
import SimplePeer from "simple-peer";

interface VideoCallProps {
  userId: number;
  remoteUserId: number;
  isInitiator?: boolean;
  onEnd?: () => void;
  userName?: string;
  remoteUserName?: string;
}

export function VideoCall({
  userId,
  remoteUserId,
  isInitiator = false,
  onEnd,
  userName = "You",
  remoteUserName = "Peer"
}: VideoCallProps) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLocalAudioEnabled, setIsLocalAudioEnabled] = useState(true);
  const [isLocalVideoEnabled, setIsLocalVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState(isInitiator ? "Calling..." : "Incoming call...");
  const [callTime, setCallTime] = useState(0);
  const [isAnswerOverlayVisible, setIsAnswerOverlayVisible] = useState(!isInitiator);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<any>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const originalStreamRef = useRef<MediaStream | null>(null);
  
  const {
    status: wsStatus,
    sendMessage,
    addEventListener
  } = useWebSocket(userId);
  
  // Initialize media stream
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        console.log("Got local media stream");
        setLocalStream(stream);
        originalStreamRef.current = stream;
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        if (isInitiator && wsStatus === "open") {
          // Initiator starts the call process after getting media
          sendMessage({
            type: "video_call_request",
            from: userId,
            to: remoteUserId
          });
          setStatusMessage("Calling...");
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setStatusMessage("Failed to access camera/microphone");
      }
    };
    
    initializeMedia();
    
    return () => {
      // Clean up media stream
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      
      if (originalStreamRef.current) {
        originalStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [userId, remoteUserId, isInitiator, wsStatus, sendMessage]);
  
  // Create WebRTC connection when user answers call or when initiator has media ready
  const initializePeerConnection = useCallback((isOfferer: boolean, signal?: any) => {
    if (!localStream) return;
    
    // Stop any existing peer connection
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    
    const peer = new SimplePeer({
      initiator: isOfferer,
      stream: localStream,
      trickle: false
    });
    
    peerRef.current = peer;
    
    peer.on('signal', (data: any) => {
      console.log("Got signal data to send to peer", isOfferer ? "as offerer" : "as answerer");
      sendMessage({
        type: isOfferer ? "video_call_offer" : "video_call_answer",
        from: userId,
        to: remoteUserId,
        signal: data
      });
    });
    
    peer.on('connect', () => {
      console.log("Peer connection established");
      setIsConnected(true);
      setIsCallActive(true);
      setStatusMessage("Connected");
      
      // Start call timer
      callTimerRef.current = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    });
    
    peer.on('stream', (stream: MediaStream) => {
      console.log("Received remote stream");
      setRemoteStream(stream);
      
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });
    
    peer.on('close', () => {
      console.log("Peer connection closed");
      cleanupCall();
    });
    
    peer.on('error', (err: Error) => {
      console.error("Peer connection error:", err);
      setStatusMessage("Connection error");
      cleanupCall();
    });
    
    // If we have a signal from the remote peer (answering a call), use it
    if (!isOfferer && signal) {
      peer.signal(signal);
    }
  }, [localStream, userId, remoteUserId, sendMessage]);
  
  // Handle WebSocket messages for video call signaling
  useEffect(() => {
    const removeVideoCallRequestListener = addEventListener('video_call_request', (data) => {
      if (data.to === userId && data.from === remoteUserId) {
        setStatusMessage("Incoming call...");
        setIsAnswerOverlayVisible(true);
      }
    });
    
    const removeVideoCallOfferListener = addEventListener('video_call_offer', (data) => {
      if (data.to === userId && data.from === remoteUserId) {
        if (!isInitiator) {
          console.log("Received call offer, waiting for user to answer");
          // Store the offer to use when user answers
          peerRef.current = peerRef.current || { signal: data.signal } as any;
        }
      }
    });
    
    const removeVideoCallAnswerListener = addEventListener('video_call_answer', (data) => {
      if (data.to === userId && data.from === remoteUserId && peerRef.current && 'signal' in peerRef.current) {
        console.log("Received call answer");
        peerRef.current.signal(data.signal);
      }
    });
    
    const removeVideoCallEndListener = addEventListener('video_call_end', (data) => {
      if (data.to === userId && data.from === remoteUserId) {
        setStatusMessage("Call ended");
        cleanupCall();
        if (onEnd) onEnd();
      }
    });
    
    return () => {
      removeVideoCallRequestListener();
      removeVideoCallOfferListener();
      removeVideoCallAnswerListener();
      removeVideoCallEndListener();
    };
  }, [userId, remoteUserId, isInitiator, addEventListener, onEnd]);
  
  // Answer call function
  const answerCall = useCallback(() => {
    setIsAnswerOverlayVisible(false);
    
    if (peerRef.current && 'signal' in peerRef.current) {
      const signal = (peerRef.current as any).signal;
      initializePeerConnection(false, signal);
    } else {
      initializePeerConnection(false);
    }
    
    sendMessage({
      type: "video_call_accepted",
      from: userId,
      to: remoteUserId
    });
    
    setStatusMessage("Connecting...");
  }, [userId, remoteUserId, initializePeerConnection, sendMessage]);
  
  // Reject/end call
  const endCall = useCallback(() => {
    sendMessage({
      type: "video_call_end",
      from: userId,
      to: remoteUserId
    });
    
    cleanupCall();
    if (onEnd) onEnd();
  }, [userId, remoteUserId, sendMessage, onEnd]);
  
  // Start call as initiator
  const startCall = useCallback(() => {
    if (isInitiator) {
      initializePeerConnection(true);
      setStatusMessage("Calling...");
    }
  }, [isInitiator, initializePeerConnection]);
  
  // Clean up function
  const cleanupCall = useCallback(() => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    
    setIsCallActive(false);
    setIsConnected(false);
    setCallTime(0);
  }, []);
  
  // Toggle local audio
  const toggleAudio = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsLocalAudioEnabled(!isLocalAudioEnabled);
    }
  };
  
  // Toggle local video
  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsLocalVideoEnabled(!isLocalVideoEnabled);
    }
  };
  
  // Toggle screen sharing
  const toggleScreenSharing = async () => {
    try {
      if (!isScreenSharing) {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        });
        
        // Save original stream
        if (!originalStreamRef.current && localStream) {
          originalStreamRef.current = localStream;
        }
        
        // Replace video track
        if (peerRef.current) {
          const videoTrack = screenStream.getVideoTracks()[0];
          const sender = (peerRef.current as any).senders?.find(
            (s: any) => s.track.kind === 'video'
          );
          
          if (sender) {
            sender.replaceTrack(videoTrack);
          }
        }
        
        setLocalStream(screenStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        
        // Listen for end of screen sharing
        screenStream.getVideoTracks()[0].addEventListener('ended', () => {
          stopScreenSharing();
        });
        
        setIsScreenSharing(true);
      } else {
        stopScreenSharing();
      }
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };
  
  const stopScreenSharing = () => {
    if (localStream && isScreenSharing) {
      // Stop all tracks of screen sharing stream
      localStream.getTracks().forEach(track => track.stop());
      
      // Restore original stream
      if (originalStreamRef.current) {
        if (peerRef.current) {
          const videoTrack = originalStreamRef.current.getVideoTracks()[0];
          const sender = (peerRef.current as any).senders?.find(
            (s: any) => s.track.kind === 'video'
          );
          
          if (sender && videoTrack) {
            sender.replaceTrack(videoTrack);
          }
        }
        
        setLocalStream(originalStreamRef.current);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = originalStreamRef.current;
        }
      }
      
      setIsScreenSharing(false);
    }
  };
  
  // Format call time
  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="w-full max-w-5xl h-[90vh] bg-slate-900 border-slate-700 overflow-hidden relative">
        <div className="h-full flex flex-col">
          {/* Call status bar */}
          <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-amber-500'}`}></div>
              <span className="text-white font-medium">{statusMessage}</span>
            </div>
            <div className="text-slate-300">
              {isCallActive && (
                <span>{formatCallTime(callTime)}</span>
              )}
            </div>
          </div>
          
          {/* Video area */}
          <div className="flex-grow relative bg-slate-950">
            {/* Remote video (large) */}
            {remoteStream ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-slate-800 mx-auto flex items-center justify-center">
                    <span className="text-6xl text-slate-400">
                      {remoteUserName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-4 text-white text-xl">{remoteUserName}</p>
                </div>
              </div>
            )}
            
            {/* Local video (small overlay) */}
            <div className="absolute bottom-4 right-4 w-64 h-48 rounded-lg overflow-hidden border-2 border-slate-700 shadow-lg">
              {localStream ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <span className="text-4xl text-slate-400">{userName?.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                {userName}
              </div>
            </div>
            
            {/* Call controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-4">
              <motion.div 
                className="bg-slate-800/80 backdrop-blur-md p-3 rounded-full flex items-center space-x-4"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full ${isLocalAudioEnabled ? 'text-white hover:text-white/80' : 'bg-red-500/80 text-white hover:bg-red-600/80'}`}
                  onClick={toggleAudio}
                >
                  {isLocalAudioEnabled ? <Mic /> : <MicOff />}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full ${isLocalVideoEnabled ? 'text-white hover:text-white/80' : 'bg-red-500/80 text-white hover:bg-red-600/80'}`}
                  onClick={toggleVideo}
                >
                  {isLocalVideoEnabled ? <Video /> : <VideoOff />}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full ${isScreenSharing ? 'bg-blue-500/80 text-white hover:bg-blue-600/80' : 'text-white hover:text-white/80'}`}
                  onClick={toggleScreenSharing}
                >
                  {isScreenSharing ? <Monitor /> : <Share2 />}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full bg-red-500 hover:bg-red-600 text-white"
                  onClick={endCall}
                >
                  <PhoneOff />
                </Button>
              </motion.div>
            </div>
            
            {/* Incoming call overlay */}
            <AnimatePresence>
              {isAnswerOverlayVisible && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center bg-black/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Incoming call</h3>
                    <p className="text-lg text-slate-300 mb-8">
                      {remoteUserName} is calling you
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button 
                        variant="destructive" 
                        size="lg" 
                        className="rounded-full w-16 h-16 flex items-center justify-center"
                        onClick={endCall}
                      >
                        <PhoneOff className="h-6 w-6" />
                      </Button>
                      
                      <Button 
                        variant="default" 
                        size="lg"
                        className="rounded-full w-16 h-16 flex items-center justify-center bg-green-500 hover:bg-green-600"
                        onClick={answerCall}
                      >
                        <Phone className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}