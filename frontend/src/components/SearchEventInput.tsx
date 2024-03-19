'use client'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchHistoryItem from './SearchHistoryItem';

const SearchEventInput = () => {
    const [focus,setFocus] = useState(false);
    const [search,setSearch] = useState("");
    const [searchHistory, setSearchHistory] = useState(['Example 1', 'Example 2','Example 1', 'Example 2','Example 1', 'Example 2']);

    const handleSubmit = () => {
        if (search && !searchHistory.includes(search)) {
            setSearchHistory([...searchHistory, search]);
          }
          console.log(`Searching for: ${search}`);
    }

    return (
        <div className="relative w-[60%] flex flex-col items-start">

            <div className="w-full flex">
                <div className={`w-[8%] lg:h-[40px] md:h-[30px] h-[23px] bg-slate-100 border-y-[1px] border-l-[1px] border-slate-400
                    flex justify-center items-center ${focus? 'bg-white scale-105 border-0 border-white rounded-tl-3xl' : 'rounded-l-full'}`}>
                    <SearchIcon className="text-[25px] cursor-pointer rounded-full hover:scale-105 duration-300" onClick={() => handleSubmit()}/>
                </div>
        
                <input type="text" id="search-event" name="search-event" placeholder="Search event" maxLength={100} value={search} 
                    className={`text-[20px] border-y-[1px] border-r-[1px] border-slate-400 bg-slate-100  
                    ${focus? 'outline-none bg-white scale-y-105 scale-r-105 border-0 border-white rounded-tr-3xl' : 'rounded-r-full'} 
                    lg:h-[40px] md:h-[30px] h-[23px] w-[92%] pl-2`}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={(e) => setSearch(e.target.value)}/>
            </div>

            {focus && (
                <div className="absolute top-full border-t-[1px] border-gray-500 w-full bg-white shadow-lg max-h-60 overflow-auto z-10">
                    {searchHistory.map((item, index) => (
                        <SearchHistoryItem index={index} item={item} setFocus={setFocus} setSearch={setSearch}/>
                    ))}
                </div>
            )}

        </div>
    )
}

export default SearchEventInput;