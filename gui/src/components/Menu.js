import { useState } from 'react'
import '../styles/menu.css'
export function Menu({ children }) {
    return <div className="menu-container">
        {children}
    </div>    
}

export function MenuItem({ title ,onMenuClick}) {
    
    const handleClick = (e) => {
        onMenuClick(e)
    }
    return <div className="menu-item" onClick={handleClick}>
        {title}
    </div>
}

export function CollapsableMenu({ title, children }) {
    
    const [open,setOpen]= useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }

    return <div className="menu-collapsible">
        <div className='menu-item' onClick={handleOpen}>{title}</div>
        <div
            className='collapsable'
            style={{
                height: open ? "fit-content" : 0,
            }}
        >{children}</div>
    </div>
}
