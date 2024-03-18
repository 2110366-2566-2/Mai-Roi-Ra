import SearchIcon from '@mui/icons-material/Search';

const SearchEventInput = () => {
    return (
        <div className="w-[60%] flex">
            <div className="w-[8%] lg:h-[40px] md:h-[30px] h-[23px] bg-slate-100 rounded-l-full border-y-[1px] border-l-[1px] border-slate-400
                flex justify-center items-center">
                <SearchIcon className="text-[25px]"/>
            </div>
    
            <input type="text" id="search-event" name="search-event" placeholder="Search event" 
                className='border-y-[1px] border-r-[1px] border-slate-400 bg-slate-100 rounded-r-full lg:h-[40px] md:h-[30px] h-[23px] w-[92%] pl-2'/>
        </div>
    )
}

export default SearchEventInput;