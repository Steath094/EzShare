import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../store/WebSocketContext";

function Hero() {
  const roomIdRef = useRef<HTMLInputElement>(null);
  const { wsRef } = useWebSocket();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingJoin, setPendingJoin] = useState<{ room: string; role: "reader" | "writer" } | null>(null);

  function generateRoomId(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const handleJoin = (room: string, role: "reader" | "writer") => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "join",
          payload: { room, role },
        })
      );
      wsRef.current.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.type === "error") {
          setErrorMessage(data.payload.message);
          setPendingJoin(null);
          setTimeout(() => setErrorMessage(null), 2000);
        }
        if (data.type === "joined") {
          const { room } = data.payload;
          localStorage.setItem("role", role);
          navigate(`/room/${room}`);
        }
      };
      setPendingJoin({ room, role });
    } else {
      alert("WebSocket not connected.");
    }
  };

  return (
    <div className="dark:text-white flex justify-center items-center gap-6 flex-col md:h-[89vh] px-4 md:px-24">
      <div
        className="rounded-md flex justify-center items-center flex-col w-full max-w-5xl h-[75%] p-4 sm:p-10"
        style={{
          backgroundImage: `url("/Images/Bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold my-2 tracking-tighter text-white text-center px-2">
          Share Text and Code With Anyone
        </h1>
        <p className="text-[#f9fafbcc] font-light text-base sm:text-lg md:text-xl max-w-xl text-center mt-4">
          EzShare is a collaborative text editor that allows you to share text and code with anyone in real-time.
        </p>
        <button
          onClick={() => handleJoin(generateRoomId(), "writer")}
          className="bg-[#0c77f2] py-2 px-6 rounded-md mt-8 text-white text-sm sm:text-base"
        >
          Create Room
        </button>
      </div>

      <div className="w-full max-w-3xl mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          ref={roomIdRef}
          type="text"
          className="rounded-md border bg-transparent py-2 px-4 w-full sm:w-80"
          placeholder="Join Room By Code"
        />
        <button
          onClick={() => {
            const roomId = roomIdRef.current?.value.trim();
            if (roomId) {
              handleJoin(roomId, "reader");
            } else {
              alert("Please enter a room code.");
            }
          }}
          className="w-full sm:w-auto min-w-[84px] h-10 px-4 bg-[#0c77f2] hover:bg-[#0c77f2cd] hover:text-[#ffffe4] text-white text-sm font-bold rounded-md"
        >
          Join
        </button>
      </div>

      <div className="text-center font-semibold mt-4 px-2 text-sm sm:text-base">
        EzShare is a free and open-source project. You can find the source code on GitHub.
      </div>

      {errorMessage && (
        <div className="fixed bottom-6 right-6 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg transition-opacity duration-300">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Hero;
