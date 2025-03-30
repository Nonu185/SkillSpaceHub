import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import SimplePeer from 'simple-peer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Mic, MicOff, VideoOff, PhoneOff, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface VideoCallProps {
  isInitiator?: boolean;
  peerData?: string;
  onPeerData?: (data: string) => void;
  onClose: () => void;
  userName: string;
  peerName: string;
}

const VideoCall: React.FC<VideoCallProps> = ({
  isInitiator = false,
  peerData,
  onPeerData,
  onClose,
  userName,
  peerName
}) => {
  const { toast } = useToast();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [connecting, setConnecting] = useState(true);
  const [connected, setConnected] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [signalData, setSignalData] = useState<string>('');

  const peerRef = useRef<any>(null);
  const localVideoRef = useRef<Webcam>(null);

  // Initialize peer connection
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setLocalStream(stream);
        
        const peer = new SimplePeer({
          initiator: isInitiator,
          trickle: false,
          stream: stream
        });

        peer.on('signal', (data: any) => {
          // In a real app, this would be sent to the server and then to the peer
          const signalString = JSON.stringify(data);
          setSignalData(signalString);
          if (onPeerData) {
            onPeerData(signalString);
          }
        });

        peer.on('connect', () => {
          setConnecting(false);
          setConnected(true);
          toast({
            title: "Connected!",
            description: `You are now connected with ${peerName}`,
          });
        });

        peer.on('stream', (stream: MediaStream) => {
          setRemoteStream(stream);
        });

        peer.on('error', (err: Error) => {
          console.error('Peer error:', err);
          toast({
            title: "Connection Error",
            description: "There was an error connecting to the peer. Please try again.",
            variant: "destructive",
          });
        });

        peerRef.current = peer;

        // If we have peer data (the other person's signal), connect to them
        if (peerData) {
          try {
            peer.signal(JSON.parse(peerData));
          } catch (error) {
            console.error('Error connecting to peer:', error);
          }
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast({
          title: "Camera/Microphone Error",
          description: "Could not access your camera or microphone. Please check permissions.",
          variant: "destructive",
        });
      }
    };

    initializeMedia();

    // Cleanup function
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => {
          track.stop();
        });
      }
      
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [isInitiator, peerData]);

  // Update peer connection when the other person's signal is received
  useEffect(() => {
    if (peerData && peerRef.current) {
      try {
        peerRef.current.signal(JSON.parse(peerData));
      } catch (error) {
        console.error('Error processing peer data:', error);
      }
    }
  }, [peerData]);

  // Toggle video
  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  // End the call
  const endCall = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
    }
    onClose();
  };

  // Copy connection string to clipboard
  const copyConnectionString = () => {
    if (signalData) {
      navigator.clipboard.writeText(signalData);
      toast({
        title: "Connection Code Copied!",
        description: "Share this code with the other person to connect.",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Local Video */}
        <Card className="relative overflow-hidden bg-gray-900 rounded-lg">
          <div className="absolute top-2 left-2 z-10 bg-black/50 px-2 py-1 rounded text-white text-sm">
            {userName} (You)
          </div>
          {localStream && (
            <Webcam
              audio={false}
              ref={localVideoRef}
              videoConstraints={{ deviceId: localStream.getVideoTracks()[0].id }}
              className={`w-full h-64 object-cover ${!videoEnabled ? 'hidden' : ''}`}
            />
          )}
          {!videoEnabled && (
            <div className="w-full h-64 flex items-center justify-center bg-gray-800 text-white">
              <VideoOff size={48} />
            </div>
          )}
        </Card>

        {/* Remote Video */}
        <Card className="relative overflow-hidden bg-gray-900 rounded-lg">
          <div className="absolute top-2 left-2 z-10 bg-black/50 px-2 py-1 rounded text-white text-sm">
            {peerName}
          </div>
          {remoteStream ? (
            <video
              autoPlay
              playsInline
              ref={(video) => {
                if (video && remoteStream) video.srcObject = remoteStream;
              }}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-800 text-white p-4">
              {connecting ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                  <p>Connecting to {peerName}...</p>
                  {!connected && signalData && (
                    <div className="mt-4 text-center">
                      <p className="mb-2 text-sm">If they're not connecting automatically, share your code:</p>
                      <Button size="sm" onClick={copyConnectionString}>
                        Copy Connection Code
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <VideoOff size={48} className="mb-2" />
                  <p>Waiting for {peerName}'s video...</p>
                </>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Connection string input for manual connections */}
      {!connected && !remoteStream && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm mb-2">Ask the other person to share their connection code:</p>
            <textarea 
              className="w-full p-2 border rounded mb-2 text-xs font-mono"
              placeholder="Paste connection code here..."
              rows={3}
              value={peerData || ''}
              onChange={(e) => {
                if (onPeerData) {
                  onPeerData(e.target.value);
                }
              }}
            />
            <Button 
              size="sm" 
              disabled={!peerData} 
              onClick={() => {
                if (peerRef.current && peerData) {
                  try {
                    peerRef.current.signal(JSON.parse(peerData));
                  } catch (error) {
                    console.error('Error connecting with code:', error);
                    toast({
                      title: "Invalid Connection Code",
                      description: "Please check the code and try again.",
                      variant: "destructive",
                    });
                  }
                }
              }}
            >
              Connect
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <Button 
          variant={audioEnabled ? "outline" : "destructive"} 
          size="icon" 
          onClick={toggleAudio}
        >
          {audioEnabled ? <Mic /> : <MicOff />}
        </Button>
        <Button 
          variant={videoEnabled ? "outline" : "destructive"} 
          size="icon" 
          onClick={toggleVideo}
        >
          {videoEnabled ? <Video /> : <VideoOff />}
        </Button>
        <Button 
          variant="destructive" 
          size="icon" 
          onClick={endCall}
        >
          <PhoneOff />
        </Button>
      </div>
    </div>
  );
};

export default VideoCall;