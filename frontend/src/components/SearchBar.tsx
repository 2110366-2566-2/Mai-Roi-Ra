'use client'
import { useState } from "react"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useRouter } from "next/navigation";
import SearchIcon from '@mui/icons-material/Search';
import SearchHistoryItem from './SearchHistoryItem';
import { useSession } from "next-auth/react";

interface Props {
    last_page: number;
    page: number;
    search : string;
    history : string[];
}

const SearchBar = ({page,last_page,search,history} : Props) => {
    const [nextHover,setNextHover] = useState(false);
    const [previousHover,setPreviousHover] = useState(false);
    const [firstHover,setFirstHover] = useState(false);
    const [lastHover,setLastHover] = useState(false);
    const router  =  useRouter();
    const [searching,setSearching] = useState("");
    const [focus,setFocus] = useState(false);
    const [searchHover,setSearchHover] = useState(false);
    const [searchHistory, setSearchHistory] = useState(history);
    const session = useSession();
    const user = session?.data?.user;

    const handleSubmit = () => {
        if (searching == "") {
            return;
        } else {
            setSearching("");
            router.push(`/homepage?search=${searching}`);
        }
    }

    console.log(user);

    return (
        <div className='pt-2 w-full'>
            <div className="md:flex md:flex-row md:justify-between w-full md:items-center md:space-y-0 space-y-2">

                <div className="relative md:w-[60%] w-[80%] flex flex-col items-start">
                    <div className="w-full flex z-20">
                        <div className={`flex-row relative w-[8%] lg:h-[40px] md:h-[30px] h-[23px] bg-slate-100  
                            flex md:justify-center justify-end items-center 
                            ${focus? 'bg-white scale-105 border-b-[1px] border-gray-500 rounded-tl-3xl' : 'border-l-[1px] border-y-[1px] border-slate-400 rounded-l-full'}`}
                            onMouseEnter={() => setSearchHover(true)}
                            onMouseLeave={() => setSearchHover(false)}
                            onClick={() => setSearchHover(false)}>
                            <SearchIcon className="lg:text-[25px] md:text-[20px] sm:text-[15px] text-[15px] cursor-pointer rounded-full hover:scale-105 duration-300" onClick={() => handleSubmit()}/>

                            {searchHover && 
                                <div className="absolute top-0 mt-[35px] h-fit w-fit p-2 bg-black text-white text-[10px] rounded shadow-md opacity-60">
                                    Search
                                </div>
                            }
                        </div>

                        <input type="text" id="search-event" name="search-event" placeholder="Search event" maxLength={100} value={searching} 
                            className={`bg-slate-100 outline-none
                            ${focus? 'bg-white scale-y-105 scale-r-105 border-0 border-b-[1px] border-gray-500 rounded-tr-3xl' : 'border-y-[1px] border-r-[1px] border-slate-400 rounded-r-full'} 
                            lg:h-[40px] md:h-[30px] h-[23px] w-[92%] pl-2 lg:text-[20px] md:text-[15px] sm:text-[13px] text-[13px]`}
                            onFocus={() => {
                                history.length > 0 && setFocus(true)}}
                            onBlur={() => setFocus(false)}
                            onChange={(e) => setSearching(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}/>
                    </div>

                    {focus ? (
                        <div className="absolute top-full w-full bg-white shadow-lg max-h-60 overflow-auto z-10">
                            {searchHistory.map((item, index) => (
                                <SearchHistoryItem index={index} item={item} setFocus={setFocus} setSearch={setSearching}/>
                            ))}
                        </div>
                    ) : null} 
                </div>                  

                <div className="md:w-[40%] w-full flex md:justify-end justify-start flex-row flex-wrap items-center lg:space-x-2 md:space-x-1 space-x-0">
                    {
                        page > 0 &&                   
                        <div className="text-gray-500 lg:mr-[20px] md:mr-0 mr-[10px] md:text-[15px] text-[12px]">
                            Page {page} of {last_page}
                        </div>
                    }
 
                    {
                        page == 1 ? 
                        <div className='rounded-full w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center'>
                            <KeyboardDoubleArrowLeftIcon className="md:text-[25px] text-[17px] text-gray-300"/>
                        </div> : 
                        <div className="relative flex flex-col items-center">
                            <div className={`rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center`}
                                onMouseEnter={() => setFirstHover(true)}
                                onMouseLeave={() => setFirstHover(false)}
                                onClick={() => setFirstHover(false)}>
                                <KeyboardDoubleArrowLeftIcon className="md:text-[25px] text-[17px] text-gray-500" onClick={() => router.push(`/homepage${search != '' ? `?search=${search}` : ''}`)}/>
                            </div>

                            {firstHover && (
                                <div className="absolute top-0 mt-[35px] h-fit w-fit p-2 bg-black text-white text-[10px] rounded shadow-md opacity-60 ">
                                    Firstpage
                                </div>
                            )}
                        </div>
                    }

                    {
                        page == 1 ? 
                        <div className='rounded-full w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center'>
                            <KeyboardArrowLeftIcon className="md:text-[25px] text-[17px] text-gray-300"/>
                        </div> : 
                        <div className="relative flex flex-col items-center">
                            <div className={`rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center`}
                                onMouseEnter={() => setPreviousHover(true)}
                                onMouseLeave={() => setPreviousHover(false)}
                                onClick={() => setPreviousHover(false)}>
                                <KeyboardArrowLeftIcon className="md:text-[25px] text-[17px] text-gray-500" onClick={() => router.push(`/homepage?offset=${page != 1 ? page-1 : 1}${search != '' ? `&search=${search}` : ''}`)}/>
                            </div>

                            {previousHover && (
                                <div className="absolute top-0 mt-[35px] h-fit w-fit p-2 bg-black text-white text-[10px] rounded shadow-md opacity-60">
                                    Previous
                                </div>
                            )}
                        </div>
                    }
                    
                    {
                         page == last_page ? 
                         <div className='rounded-full w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center'>
                             <KeyboardArrowRightIcon className="md:text-[25px] text-[17px] text-gray-300"/>
                         </div> : 
                         <div className="relative flex flex-col items-center">
                             <div className={`rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center`}
                                 onMouseEnter={() => setNextHover(true)}
                                 onMouseLeave={() => setNextHover(false)}
                                 onClick={() => setNextHover(false)}>
                                <KeyboardArrowRightIcon className="md:text-[25px] text-[17px] text-gray-500" onClick={() => router.push(`/homepage?offset=${page+1}${search != '' ? `&search=${search}` : ''}`)}/>
                             </div>
 
                             {nextHover && (
                                 <div className="absolute top-0 mt-[35px] h-fit w-fit p-2 bg-black text-white text-[10px] rounded shadow-md opacity-60">
                                    Next
                                 </div>
                             )}
                         </div>
                    }
                    
                    {
                         page == last_page ? 
                         <div className='rounded-full w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center'>
                             <KeyboardDoubleArrowRightIcon className="md:text-[25px] text-[17px] text-gray-300"/>
                         </div> : 
                         <div className="relative flex flex-col items-center">
                             <div className={`rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center`}
                                 onMouseEnter={() => setLastHover(true)}
                                 onMouseLeave={() => setLastHover(false)}
                                 onClick={() => setLastHover(false)}>
                                <KeyboardDoubleArrowRightIcon className="md:text-[25px] text-[17px] text-gray-500" onClick={() => router.push(`/homepage?offset=${last_page}${search != '' ? `&search=${search}` : ''}`)}/>
                             </div>
 
                             {lastHover && (
                                 <div className="absolute top-0 mt-[35px] h-fit w-fit p-2 bg-black text-white text-[10px] rounded shadow-md opacity-60">
                                    Lastpage
                                 </div>
                             )}
                         </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchBar;