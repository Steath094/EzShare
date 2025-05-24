import React from "react";
import SunIcon from "../Icons/SunIcon";
import MoonIcon from "../Icons/MoonIcon";
import GithubIcon from "../Icons/GithubIcon";

export default function Navbar() {
    const [dark, setDark] = React.useState(() => {
     return localStorage.getItem('theme') === 'dark';
    });

    React.useEffect(() => {
    if (dark) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
    }, [dark]);

    const darkModeHandler = () => {
    setDark(prev => !prev);
    };

  return (
    <nav className="w-full flex justify-between py-4 px-10">
        <div className="flex gap-3">
            <img className="h-12" src="Images/EzShareLogo.png" alt="EzShareLogo" />
            <h3 className="dark:text-white text-4xl">EzShare</h3>
        </div>


        <div className="flex gap-4">
            <button className=""><a href="https://github.com/Steath094" target="_blank"><GithubIcon/></a></button>
            <button onClick={darkModeHandler} className="dark:text-white cursor-pointer" >{dark===true?<SunIcon/>:<MoonIcon/>}</button>
        </div>
    </nav>
  )
}
