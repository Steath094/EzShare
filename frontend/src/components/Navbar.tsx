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
        <nav className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 py-4 px-6 md:px-10">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
                <img className="h-10 md:h-12" src="Images/EzShareLogo.png" alt="EzShareLogo" />
                <h3 className="dark:text-white text-2xl md:text-4xl font-semibold">EzShare</h3>
            </div>

            {/* Icons */}
            <div className="flex gap-3 items-center">
                <a href="https://github.com/Steath094" target="_blank" rel="noopener noreferrer">
                    <div className="p-2 dark:bg-[#223549] rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center">
                        <GithubIcon />
                    </div>
                </a>
                <button
                    onClick={darkModeHandler}
                    className="dark:text-white text-black p-2 rounded-full"
                    aria-label="Toggle Dark Mode"
                >
                    {dark ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
        </nav>
    );
}
