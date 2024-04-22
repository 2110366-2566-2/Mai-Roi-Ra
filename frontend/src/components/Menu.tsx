'use client'
import MenuPopup from "./MenuPopup";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

interface Props {
    user_name:string;
    email:string|null;
    phone_number:string|null;
    user_image:string;
}

const Menu = ({user_name,email,phone_number,user_image} : Props) => {
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
              <MenuPopup isVisible={showModal} onClose={()=>setShowModal(false)}
              username={user_name} email={email} phone_number={phone_number} user_image={user_image}/>
        </div>
    )
}

export default Menu;
