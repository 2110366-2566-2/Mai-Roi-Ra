'use client'
import { useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    index:any
    item:string
    setSearch:Function
    setFocus:Function
}

const searchHistoryItem = ({index,item,setSearch,setFocus} : Props) => {
    const [historyHover,setHistoryHover] = useState(false);

    return (
        <div className={`px-4 py-2 flex justify-between flex-row items-end ${historyHover ? 'bg-slate-100' : 'bg-white'}`}
            onMouseEnter={() => setHistoryHover(true)} onMouseLeave={() => setHistoryHover(false)}> 

            <div className="flex justify-start flex-row w-[70%] items-end space-x-3"
                onClick={(e) => { setSearch(item); setFocus(false); e.stopPropagation(); e.preventDefault();}}>
                <div>
                    <AccessTimeIcon className="text-[15px] text-gray-500"/>
                </div>

                <div key={index} className="text-[14px] text-gray-600">
                        {item}
                </div>
            </div> 

            { historyHover && 
                <div className="text-end w-[30%]">
                <CloseIcon className="text-[15px] cursor-pointer text-gray-500"
                onClick={(e) => {e.stopPropagation(); e.preventDefault();}}/>
                </div>
            }
        </div>
    )
}

export default searchHistoryItem;