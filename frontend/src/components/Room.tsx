import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useWebSocket } from "../store/WebSocketContext";

export default function Room() {
  const [isCopied, setIsCopied] = useState(false);
  const { wsRef } = useWebSocket();
  const roomCode = useParams().roomId;
  const textContentRef = useRef<HTMLTextAreaElement>(null);
  const role = localStorage.getItem("role");

  wsRef.current!.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.type === "chat") {
      textContentRef.current!.value = data.payload.message;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textContentRef.current!.value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleClear = () => {
    textContentRef.current!.value = "";
  };

  const handleShare = () => {
    const content = textContentRef.current?.value.trim();
    if (!content || !roomCode) return;

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            room: roomCode,
            message: content,
          },
        })
      );
    } else {
      alert("WebSocket not connected.");
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-6 w-full max-w-screen-xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl dark:text-white font-semibold mb-4 text-center sm:text-left">
        Room Code: {roomCode}
      </h1>

      <div className="flex flex-col gap-4">
        <textarea
          ref={textContentRef}
          name="content"
          id="content"
          className="min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] dark:text-white resize-none rounded-lg border-2 border-[#314b68] bg-[#182534] text-white p-4"
          placeholder="Start typing or paste your text here"
        ></textarea>

        <div className="flex flex-wrap gap-3">
          {role === "writer" && (
            <button
              onClick={handleShare}
              className="flex items-center justify-center rounded-lg h-10 px-4 bg-[#0c77f2] hover:bg-[#0c77f2cd] text-white text-sm font-bold"
            >
              Share
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="rounded-lg h-10 px-4 bg-[#0c77f2] hover:bg-[#0c77f2cd] text-white text-sm font-bold"
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleClear}
            className="rounded-lg h-10 px-4 bg-[#0c77f2] hover:bg-[#0c77f2cd] text-white text-sm font-bold"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
