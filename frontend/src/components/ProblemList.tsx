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
  const datas = problems.problem_lists;
  console.log(problems);
  console.log(user);

  return (
    <main className="text-black flex flex-col h-screen overflow-hidden">
      <div className='py-[5px] md:mt-[20px] mt-[5px] overflow-y-auto'>
        {datas.map((problemItem:any) => (
          <ProblemItem id={problemItem.problem_id} problem={problemItem.problem} description={problemItem.description}/>
        ))}
      </div> :
      <ReportProblemPage/>
    </main>
  )
}