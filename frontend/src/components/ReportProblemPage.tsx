'use client'
import React, { useState } from 'react';
import styles from "@/styles/FontPage.module.css"
import ReportPopup from "@/components/ReportPopup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ProblemList from './ProblemList';



const ReportProblemPage = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='lg:pt-20 pt-5 px-20 text-black'>
            {/* Topic */}



            {/* Form */}
            <div className="flex flex-row justify-center w-full mt-[30px] mb-[50px]" >
                <button className=" border-slate-400 flex justify-center flex-row items-center rounded-full 
                lg:h-[40px] md:h-[35px] h-[35px] 
                lg:w-[140px] md:w-[110px] w-[110px] hover:scale-105 duration-300 text-black py-[10px] px-[10px]
                lg:text-[17px] md:text-[11px] text-[11px] bg-[#F2D22E]"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setShowModal(true);
                    }}><span className="mr-[5px]">
                        <AddCircleOutlineIcon />
                    </span>{" "}
                    Report
                </button>

            </div>

            <ReportPopup isVisible={showModal} onClose={() => setShowModal(false)} />

        </div>
    )
}

export default ReportProblemPage;