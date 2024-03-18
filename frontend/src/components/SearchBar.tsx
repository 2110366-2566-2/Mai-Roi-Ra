import Link from "next/link"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import SearchEventInput from "./SearchEventInput";

interface Props {
    page: number,
    limit: number
}

const SearchBar = ({page,limit} : Props) => {
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
                        <Link className={`rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center`}
                        href={`/homepage?offset=1&limit=${limit}`}>
                            <KeyboardDoubleArrowLeftIcon className="text-[25px] text-gray-500"/>
                        </Link>
                    }

                    {
                        page == 1 ? 
                        <div className='rounded-full w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center'>
                            <KeyboardArrowLeftIcon className="text-[25px] text-gray-300"/>
                        </div> : 
                        <Link className={`rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center`}
                        href={`/homepage?offset=${page != 1 ? page-1 : 1}&limit=${limit}`}>
                            <KeyboardArrowLeftIcon className="text-[25px] text-gray-500"/>
                        </Link>
                    }
                    
                    <Link className="rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center"
                       href={`/homepage?offset=${page+1}&limit=${limit}`}>
                        <KeyboardArrowRightIcon className="text-[25px] text-gray-500"/>
                    </Link>
                    
                    <Link className="rounded-full hover:bg-gray-100 w-[35px] h-[35px] duration-500 flex justify-center flex-row items-center"
                       href={`/homepage?offset=${page+1}&limit=${limit}`}>
                        <KeyboardDoubleArrowRightIcon className="text-[25px] text-gray-500"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;