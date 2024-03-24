import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProblemItem from "./ProblemItem";

import ReportProblemButton from "./ReportProblemButton";

interface Props {
  datas: any[];
}

export default function ProblemList({ datas }: Props) {

  console.log(datas);
  return (
    <main className="text-black flex flex-col h-screen overflow-hidden">
      <div className='py-[20px] md:mt-[20px] mt-[5px] overflow-y-auto'>
        {datas.map((problemItem:any) => (
          <ProblemItem id={problemItem.problem_id} problem={problemItem.problem} description={problemItem.description}/>
        ))}
      </div> 
      <ReportProblemButton></ReportProblemButton>
    </main>
  );
}
