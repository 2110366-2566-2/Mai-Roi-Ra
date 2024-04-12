'use client'
import styles from "@/styles/FontPage.module.css"
import Image from "next/image"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useRouter } from "next/navigation";

interface Props {
    topic:string
    isVisible:boolean
}

const SuccessModal = ({topic,isVisible} : Props) => {
    const router = useRouter();
    if (!isVisible) return null;

    const handlerClose = async () => {
        router.push('/profile');
    }

    return (
        <div className="w-screen h-screen fixed inset-0 flex flex-row justify-center items-center 
        bg-opacity-25 bg-black z-40">
            <div className="lg:w-[694px] lg:h-[427px] md:w-[500px] md:h-[350px] w-[350px] h-[300px] bg-white pt-[15px] px-[15px] z-40">
                <div className="relative top-[-5px] right-[-5px] text-end">
                    <CancelOutlinedIcon className="text-3xl icon-large cursor-pointer" onClick={handlerClose}/>
                </div>


                <div className={`${styles.Roboto} w-full text-center lg:text-[40px] md:text-[30px] text-[25px]`}>
                        {topic}
                </div>

                <div className="w-full flex justify-center mt-[40px]">
                    <Image className="lg:w-[220px] lg:h-[200px] md:w-[200px] md:h-[170px] sm:w-[120px] sm:h-[120px]"
                    src="/img/true.png"
                    alt="Failed To Load Image"
                    width={1000}
                    height={1000}/>
                </div>

            </div>
        </div>
    )
}

export default SuccessModal;