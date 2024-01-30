'use client'
import styles from "@/styles/FontPage.module.css"
import { useState } from "react"

interface Props {
    picture: string
    topic: string
    detail: string
}

export default function PromoteCard({ picture, topic, detail }: Props) {
    const [hovered, setHovered] = useState(false);

    function handleHover() {
        setHovered(!hovered);
    }

    return (
        <div
            className={`${styles.campgroundFont} dark:text-black w-[200px] rounded-xl overflow-hidden relative ${hovered ? "h-[400px]" : "h-[200px]"}`}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <div className="transition-transform hover:scale-[1.115]">
                <div className="text-center text-[100px]">{picture}</div>
                <div className="font-bold text-center text-[18px]">{topic}</div>
            </div>
            <div className={`mt-[15px] flex flex-row justify-center text-center flex-wrap h-[180px] mx-[10px] transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"} `}>
                {detail}
            </div>
        </div>
    );
}
