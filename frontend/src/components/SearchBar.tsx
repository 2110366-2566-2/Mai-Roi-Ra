'use client'
import { useState } from "react"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import SearchEventInput from "./SearchEventInput";
import { useRouter } from "next/navigation";

interface Props {
    page: number,
    limit: number
}

const SearchBar = ({page,limit} : Props) => {
    const [nextHover,setNextHover] = useState(false);
    const [previousHover,setPreviousHover] = useState(false);
    const [firstHover,setFirstHover] = useState(false);
    const [lastHover,setLastHover] = useState(false);
    const router  =  useRouter();

    return (
        <div className='pt-2 w-full'>
            <div className="flex flex-row justify-between w-full items-center">
                <SearchEventInput/>                    

                <div className="w-[40%] flex justify-end flex-row flex-wrap items-center space-x-2">
                    {
                        page == 1 ? 
                        <div className='rounded-full w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center'>
                            <KeyboardDoubleArrowLeftIcon className="text-[25px] text-gray-300"/>
                        </div> : 
                        <div className={`rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center`}>
                            <KeyboardDoubleArrowLeftIcon className="text-[25px] text-gray-500" onClick={() => router.push(`/homepage?offset=1&limit=${limit}`)}/>
                        </div>
                    }

                    {
                        page == 1 ? 
                        <div className='rounded-full w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center'>
                            <KeyboardArrowLeftIcon className="text-[25px] text-gray-300"/>
                        </div> : 
                        <div className={`rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center`}>
                            <KeyboardArrowLeftIcon className="text-[25px] text-gray-500" onClick={() => router.push(`/homepage?offset=${page != 1 ? page-1 : 1}&limit=${limit}`)}/>
                        </div>
                    }
                    
                    <div className="rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center">
                        <KeyboardArrowRightIcon className="text-[25px] text-gray-500" onClick={() => router.push(`/homepage?offset=${page+1}&limit=${limit}`)}/>
                    </div>
                    
                    <div className="rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center">
                        <KeyboardDoubleArrowRightIcon className="text-[25px] text-gray-500" onClick={() => router.push(`/homepage?offset=${page+1}&limit=${limit}`)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;