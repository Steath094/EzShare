import { useEffect } from "react";
import Navbar from "./components/Navbar"
import Hero from "./components/Hero";

function App() {
  useEffect(() => {
    if (localStorage.getItem("theme")==="dark") {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);
  return (
    
    <div className="dark:bg-[#101923] h-svh">
      <Navbar/>
      <Hero/>
    </div>
  )
}

export default App
