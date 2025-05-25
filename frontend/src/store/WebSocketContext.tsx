import React, { createContext, useContext, useRef, useEffect } from "react";

type WebSocketContextType = {
  wsRef: React.RefObject<WebSocket | null>;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
  const ws = new WebSocket("ws://localhost:8080");

  const handleOpen = () => {
    console.log("✅ WebSocket connected");
    wsRef.current = ws;
  };

  const handleError = (err: Event) => {
    console.error("❌ WebSocket error", err);
  };

  const handleClose = () => {
    console.log("🔌 WebSocket disconnected");
  };

  ws.onopen = handleOpen;
  ws.onerror = handleError;
  ws.onclose = handleClose;

  return () => {
    if (ws.readyState === WebSocket.OPEN) {
      console.log("Closing WebSocket...");
      ws.close();
    } else {
      console.warn("Skipped closing WebSocket — not open yet.");
    }
  };
}, []);


  return (
    <WebSocketContext.Provider value={{ wsRef }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocket must be used within WebSocketProvider");
  return context;
};
