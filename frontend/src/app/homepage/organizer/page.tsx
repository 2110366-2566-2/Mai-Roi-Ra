import Image from 'next/image';
import EventItem from '@/components/EventItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from 'next/link';

export default function UserHomepage() {
    const mockdata = [
        {   
            id:'1',
            name:'Event Name',
            startDate:'21 Jan 2024',
            endDate:'23 Jan 2024',
            description:'ยืนรอรถเมล์ต้องควบคู่กับการซื้อหมูปิ้งข้างทาง พร้อมกลิ่นปะยางจากร้านมอไซต์ข้างๆชวนให้เกิดอารมณ์สุนทรีย์ พร้อมพลีกายเพื่อชาติบ้านเมือง',
            imgSrc:'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
          {
            id:'2',
            name: 'Birthday Party',
            startDate: '15 Feb 2024',
            endDate: '16 Feb 2024',
            description: 'Celebrate John\'s birthday with friends and family at the park.',
            imgSrc:'https://images.unsplash.com/photo-1560173045-beaf11c65dce?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
    ]
    
  return (
    <main className="bg-white text-black h-full">
        <div className='lg:pt-8 pt-2 pl-10'>
            <h1 className='font-bold lg:text-5xl text-3xl lg:mb-8 md:mb-7 mb-5'>My Event</h1>
            <div className="flex flex-row justify-start w-full">
                <input type="text" id="search-event" name="search-event" placeholder="Search" 
                    className='border border-slate-400 rounded-xl lg:h-[30px] md:h-[30px] h-[23px] lg:w-[70%] md:w-[70%] w-[55%] mr-[20px] pl-2'
                />
                <button className='border border-slate-400 rounded-xl lg:h-[30px] md:h-[30px] h-[23px] lg:w-[80px] md:w-[80px] w-[65px] hover:scale-105 duration-300
                lg:ml-[20px] md:ml-[15px] sm:ml-[10px] ml-[10px]'>
                    Filter
                </button>
            </div>
        </div>
        <div className="mt-8 px-10">
                {mockdata.map((event, index) => (
                    <EventItem key={index} event={event} />
                ))}
        </div>
        <div className="flex flex-row justify-center w-full mt-[30px] mb-[50px]">
            <Link href="/homepage/organizer/createvent">
                <button className='border border-slate-400 flex justify-center flex-row items-center rounded-full 
                lg:h-[40px] md:h-[35px] h-[35px] 
                lg:w-[140px] md:w-[110px] w-[110px] hover:scale-105 duration-300 text-black py-[10px] px-[10px]
                lg:text-[17px] md:text-[11px] text-[11px]'>
                <span className="mr-[5px]"><AddCircleOutlineIcon/></span> Add events
                </button>
            </Link>
            
        </div>
    </main>
  )
}
