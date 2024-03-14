'use client'
import MenuPopup from "./MenuPopup";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

const Menu = () => {
    const [showModal,setShowModal] = useState<boolean>(false);

    return (
        <div className="lg:w-[0px] lg:h-[0px] md:w-[50px] md:h-[50px] h-[25px] w-[25px]">
              <div className="flex justify-start flex-row items-center bg-opacity-50 font-normal w-screen 
              border-gray-400 lg:border-b-[0px] border-b-[1px] lg:static relative">
                        <div className="flex flex-row justify-end px-4 py-2 items-center border-gray-400 border-r-[1px]">
                            <MenuIcon className='text-[25px] text-black cursor-pointer'
                            onClick={() => setShowModal(true)}/>
                        </div>
              </div>
              <MenuPopup isVisible={showModal} onClose={()=>setShowModal(false)}/>
        </div>
    )
}

export default Menu;
