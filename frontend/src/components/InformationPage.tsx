import Image from "next/image";
import styles from "@/styles/FontPage.module.css"
import Card from "./Card";

export default function InformationPage(){
    return (
        <div>
            <div className="fixed inset-0 bg-cover bg-center z-0">
                <Image src="/images/informationBg.jpg"
                className="opacity-80"
                alt="Error For Load Information Background"
                fill={true}/>
            </div>
            <div className={`${styles.allFont} text-center relative 
                text-white mt-[130px] text-[80px]`}>
                    <h1>CAMPING INFO</h1>
            </div>
            <div className="text-center mx-[5%]">
                <Card/>
            </div>
        </div>
    )
}