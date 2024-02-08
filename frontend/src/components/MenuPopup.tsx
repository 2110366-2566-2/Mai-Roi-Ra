'use client'
import { useState } from "react";
import Image from "next/image";

interface Props {
    onPath:number
    onVisible:boolean
    onClose:Function
}

const MenuPopup = ({onPath,onVisible,onClose} : Props) => {
    const [onShowMenu,setShowMenu] = useState(onVisible);

    return (
        <div className="w-screen h-screen fixed inset-0 bg-opacity-25 bg-black">
            
        </div>
    )
}

export default MenuPopup;