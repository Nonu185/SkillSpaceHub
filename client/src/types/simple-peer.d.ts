declare module 'simple-peer' {
  import { EventEmitter } from 'events';

  interface SimplePeerOptions {
    initiator?: boolean;
    channelConfig?: object;
    channelName?: string;
    config?: object;
    offerOptions?: object;
    answerOptions?: object;
    sdpTransform?: (sdp: string) => string;
    stream?: MediaStream;
    streams?: MediaStream[];
    trickle?: boolean;
    allowHalfTrickle?: boolean;
    objectMode?: boolean;
    wrtc?: object;
  }

  interface SimplePeerData {
    type: string;
    sdp: string;
  }

  class SimplePeer extends EventEmitter {
    constructor(options?: SimplePeerOptions);
    
    signal(data: any): void;
    send(data: string | Uint8Array | ArrayBuffer | Blob): void;
    addStream(stream: MediaStream): void;
    removeStream(stream: MediaStream): void;
    addTrack(track: MediaStreamTrack, stream: MediaStream): void;
    removeTrack(track: MediaStreamTrack, stream: MediaStream): void;
    replaceTrack(oldTrack: MediaStreamTrack, newTrack: MediaStreamTrack, stream: MediaStream): void;
    destroy(error?: Error): void;
    
    readonly connected: boolean;
    readonly destroyed: boolean;
    readonly _remoteStreams: MediaStream[];
    readonly senders: RTCRtpSender[];
  }

  export default SimplePeer;
  export type Instance = SimplePeer;
}