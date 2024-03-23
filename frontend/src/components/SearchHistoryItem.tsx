'use client'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Link from 'next/link';

interface Props {
    index:any
    item:string
}

const searchHistoryItem = ({index,item} : Props) => {

    return (
        <div className={`px-4 py-2 text-black cursor-pointer flex-row items-end bg-white hover:bg-slate-100`}>
            
                <div className="flex justify-start flex-row w-[70%] items-end space-x-3">
                    <div>
                        <AccessTimeIcon className="text-[15px] text-gray-500"/>
                    </div>

                    <div key={index} className="text-[14px] text-gray-600">
                        {item}
                    </div>
                </div> 
                
        </div>
    )
}

export default searchHistoryItem;