import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar"
import Hero from "./components/Hero";
import Room from "./components/Room";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WebSocketProvider } from "./store/WebSocketContext";

function App() {
  const wsRef= useRef<WebSocket>(null);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    console.log("user connected",ws);
    wsRef.current=ws;
    if (localStorage.getItem("theme")==="dark") {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);
  return (
    <BrowserRouter>
    <WebSocketProvider>

        <div className="dark:bg-[#101923]">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Hero/>}/>
            <Route path="/room/:roomId" element={<Room/>}/>
          </Routes>
          {/* <Hero/>
          <Room/> */}
        </div>
        </WebSocketProvider>
    </BrowserRouter>
  )
}

export default App
