"use client";

import React, { useRef, useState, useEffect } from "react";


const DropdownThemeSelector = () => {
    // const [selectedValue, setSelectedValue] = React.useState('');
    // const [prevSelectedTheme, setPrevSelectedTheme] = React.useState('');
    // const [opened, setOpened] = React.useState(false);

    const [theme, setTheme]: [string, any] = useState(typeof localStorage !== "undefined" && localStorage.getItem("theme") || 'dark')

    useEffect(() => {
        
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("theme", theme)
            
            const localTheme: any = localStorage ? localStorage.getItem("theme") : 'dark'
            document.querySelector("html")?.setAttribute("data-theme", localTheme)
        
        }
    }, [theme])

    const availableThemes = [
        "dark",
        "light",
        "aqua",
        "luxury",
        "forest",
        "synthwave",
        "cyberpunk",
        "valentine",
        "dracula",
        "hopebased",
        "cocoa",
    ]


    return (
    
        <>
            {/* <button className="btn btn-neutral" onClick={() => setTheme('dark')}>Dark</button>
            <button className="btn btn-neutral" onClick={() => setTheme('light')}>Light</button>
            <button className="btn btn-neutral" onClick={() => setTheme('aqua')}>Aqua</button> */}
        

            <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="btn m-1">Change theme</div>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
                    {/* <li onClick={() => setTheme('dark')}><button>Dark</button></li>
                    <li onClick={() => setTheme('light')}><button>Light</button></li>
                    <li onClick={() => setTheme('aqua')}><button>Aqua</button></li> */}
                    {availableThemes.map((availableTheme, index) => (
                        <li key={index} className={`${theme && theme == availableTheme ? 'text-amber-600' : '' }`} onClick={() => setTheme(availableTheme)}><button>{availableTheme}</button></li>
                    ))}
                    <li>test: {theme}</li>
                    <li>test: {document.querySelector('html')?.getAttribute('data-theme')}</li>
                </ul>
            </div>
        
        </>
    );
};



export default DropdownThemeSelector