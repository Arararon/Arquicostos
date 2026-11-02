import { useState } from "react";
import "../styles/drawer.css";
import { ACCESS_TOKEN } from "../constants";

export default function Drawer({button,title,children}) {
    const [isOpen, setIsOpen] = useState(false);

return (
    <div>
        <div onClick={() => setIsOpen(true)}>
            {button}
        </div>

        <div
        className={`drawer-overlay ${isOpen ? "visible" : ""}`}
        onClick={() => setIsOpen(false)}/>

        <div className={`drawer ${isOpen ? "open" : ""}`}>
            <button
                className="drawer-close"
                onClick={() => setIsOpen(false)}>
            ×
            </button>

            <h2 onClick={e=>console.log(localStorage.getItem(ACCESS_TOKEN))}>{title}</h2>

            <div>
                {children}
            </div>
        </div>
    </div>
    );
}