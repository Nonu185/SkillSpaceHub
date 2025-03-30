import { useState, useEffect, useRef, useCallback } from "react";

type MessageHandler = (data: any) => void;
type WebSocketStatus = "connecting" | "open" | "closed" | "error";

interface UseWebSocketOptions {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  reconnectOnClose?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export default function useWebSocket(
  userId?: number,
  options: UseWebSocketOptions = {}
) {
  const [status, setStatus] = useState<WebSocketStatus>("connecting");
  const socketRef = useRef<WebSocket | null>(null);
  const messageHandlersRef = useRef<Map<string, MessageHandler[]>>(new Map());
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const {
    onOpen,
    onClose,
    onError,
    reconnectOnClose = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5
  } = options;

  const connect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    // Close existing connection
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }
    
    setStatus("connecting");
    
    // Create new WebSocket connection
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;
    
    socket.onopen = (event) => {
      setStatus("open");
      reconnectAttemptsRef.current = 0;
      console.log("WebSocket connection established");
      
      // Identify user if userId is provided
      if (userId) {
        socket.send(JSON.stringify({
          type: "identify",
          userId
        }));
      }
      
      if (onOpen) onOpen(event);
    };
    
    socket.onclose = (event) => {
      setStatus("closed");
      console.log("WebSocket connection closed");
      
      if (onClose) onClose(event);
      
      // Handle reconnection
      if (reconnectOnClose && reconnectAttemptsRef.current < maxReconnectAttempts) {
        console.log(`Attempting to reconnect (${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts})...`);
        reconnectAttemptsRef.current += 1;
        
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, reconnectInterval);
      }
    };
    
    socket.onerror = (event) => {
      setStatus("error");
      console.error("WebSocket error:", event);
      if (onError) onError(event);
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { type } = data;
        
        if (type) {
          const handlers = messageHandlersRef.current.get(type) || [];
          handlers.forEach(handler => handler(data));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
  }, [userId, onOpen, onClose, onError, reconnectOnClose, reconnectInterval, maxReconnectAttempts]);
  
  useEffect(() => {
    connect();
    
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);
  
  const sendMessage = useCallback((data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
      return true;
    }
    return false;
  }, []);
  
  const addEventListener = useCallback((type: string, handler: MessageHandler) => {
    const handlers = messageHandlersRef.current.get(type) || [];
    messageHandlersRef.current.set(type, [...handlers, handler]);
    
    return () => {
      const handlers = messageHandlersRef.current.get(type) || [];
      messageHandlersRef.current.set(
        type,
        handlers.filter(h => h !== handler)
      );
    };
  }, []);
  
  return {
    status,
    sendMessage,
    addEventListener,
    reconnect: connect
  };
}