import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProblemItem from './ProblemItem';
import getProblems from '@/libs/getProblems';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';
import ReportProblemPage from './ReportProblemPage';

export default async function ProblemList() {
    const session = await getServerSession(authOptions);
  const user = session?.user;
  const problems = await getProblems(user?.user_id);
  
  console.log(problems);
  console.log(user);

  return (
    <main className="text-black flex flex-col h-screen overflow-hidden">
      {/* <Suspense fallback={<div className="flex justify-center items-center w-full h-full text-[40px]">Loading...</div>}>

          { events.total_events > 0 ?
              <div className='bg-white py-[5px] md:mt-[20px] mt-[5px] overflow-y-auto'>
              {datas.map((eventItem:any) => (
              <EventItem key={eventItem.event_id} id={eventItem.event_id} name={eventItem.event_name} startDate={eventItem.start_date} endDate={eventItem.end_date}
                description={eventItem.description} city={eventItem.city} district={eventItem.district} imgSrc={eventItem.event_image} page={0}/>
              ))}
              </div> :
              <div className='h-[50%] items-center flex justify-center flex-row w-full text-[25px] text-gray-500'>
                <div className="w-full text-center space-y-[20px]">
                  <SearchOffIcon className="text-[100px]"/>
                  <div>
                    No Search Result
                  </div>
                </div>
              </div>
          }
      </Suspense>  */}
      <ReportProblemPage/>
    </main>
  )
}