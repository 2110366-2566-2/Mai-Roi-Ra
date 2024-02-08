import Image from 'next/image'
import EventItem from '@/components/EventItem'

export default function UserHomepage() {
    const mockdata = [
        {
            name:'Event Name',
            startDate:'21 Jan 2024',
            endDate:'23 Jan 2024',
            description:'ยืนรอรถเมล์ต้องควบคู่กับการซื้อหมูปิ้งข้างทาง พร้อมกลิ่นปะยางจากร้านมอไซต์ข้างๆชวนให้เกิดอารมณ์สุนทรีย์ พร้อมพลีกายเพื่อชาติบ้านเมือง',
            imgSrc:'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            name: 'Birthday Party',
            startDate: '15 Feb 2024',
            endDate: '16 Feb 2024',
            description: 'Celebrate John\'s birthday with friends and family at the park.',
            imgSrc:'https://images.unsplash.com/photo-1560173045-beaf11c65dce?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            name: 'Team Building Workshop',
            startDate: '10 Mar 2024',
            endDate: '12 Mar 2024',
            description: 'Join us for a team building workshop focused on communication and collaboration skills.',
            imgSrc:'https://images.unsplash.com/photo-1469289759076-d1484757abc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            name: 'Conference Presentation',
            startDate: '25 Apr 2024',
            endDate: '27 Apr 2024',
            description: 'Presenting our latest research findings at the annual conference. Exciting discussions await!',
            imgSrc:'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            name: 'Product Launch Event',
            startDate: '5 May 2024',
            endDate: '6 May 2024',
            description: 'Join us for the launch of our new product line. Free samples and special discounts available!',
            imgSrc:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            name: 'Family Reunion',
            startDate: '20 Jun 2024',
            endDate: '22 Jun 2024',
            description: 'Gather with relatives from near and far for a weekend of fun, food, and memories.',
            imgSrc:'https://images.unsplash.com/photo-1647833202056-e6e67293ba81?q=80&w=2806&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            name:'Event Name',
            startDate:'21 Jan 2024',
            endDate:'23 Jan 2024',
            description:'ยืนรอรถเมล์ต้องควบคู่กับการซื้อหมูปิ้งข้างทาง พร้อมกลิ่นปะยางจากร้านมอไซต์ข้างๆ ชวนให้เกิดอารมณ์สุนทรีย์ พร้อมพลีกายเพื่อชาติบ้านเมือง',
            imgSrc:'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            name: 'Birthday Party',
            startDate: '15 Feb 2024',
            endDate: '16 Feb 2024',
            description: 'Celebrate John\'s birthday with friends and family at the park.',
            imgSrc:'https://images.unsplash.com/photo-1560173045-beaf11c65dce?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            name: 'Team Building Workshop',
            startDate: '10 Mar 2024',
            endDate: '12 Mar 2024',
            description: 'Join us for a team building workshop focused on communication and collaboration skills.',
            imgSrc:'https://images.unsplash.com/photo-1469289759076-d1484757abc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            name: 'Conference Presentation',
            startDate: '25 Apr 2024',
            endDate: '27 Apr 2024',
            description: 'Presenting our latest research findings at the annual conference. Exciting discussions await!',
            imgSrc:'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            name: 'Product Launch Event',
            startDate: '5 May 2024',
            endDate: '6 May 2024',
            description: 'Join us for the launch of our new product line. Free samples and special discounts available!',
            imgSrc:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            name: 'Family Reunion',
            startDate: '20 Jun 2024',
            endDate: '22 Jun 2024',
            description: 'Gather with relatives from near and far for a weekend of fun, food, and memories.',
            imgSrc:'https://images.unsplash.com/photo-1647833202056-e6e67293ba81?q=80&w=2806&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
    ]
    
  return (
    <main className="bg-white text-black h-full">
        <div className='lg:pt-8 pt-2 pl-10'>
            <h1 className='font-bold text-5xl mb-8'>Explore Events</h1>
            <div>
                <input type="text" id="search-event" name="search-event" placeholder="Search" 
                    className='border border-slate-400 rounded-xl h-[30px] w-[700px] mr-[20px] pl-2'
                />
                <button className='border border-slate-400 rounded-xl h-[30px] w-[80px]'>Filter</button>
            </div>
        </div>
        <div className="mt-8 px-10">
                {mockdata.map((event, index) => (
                    <EventItem key={index} event={event} />
                ))}
        </div>


    </main>
  )
}
