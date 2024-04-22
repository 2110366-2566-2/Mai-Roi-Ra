import ProblemItem from "./ProblemItem";
import { TbZoomCancel } from "react-icons/tb";

import ReportProblemButton from "./ReportProblemButton";

interface Props {
  datas: any[];
}

export default function ProblemList({ datas }: Props) {
  console.log(datas);
  return (
    <main className="text-black flex flex-col">
      {datas.length == 0 && (
        <div className="text-slate-400 mt-16 w-full flex flex-col justify-center items-center space-y-4">
          <div className="text-7xl">
            <TbZoomCancel />
          </div>
          <p className="text-xl">No sent reports found</p>
        </div>
      )}
      <div className="mt-8 px-4 lg:px-10">
        {datas.map((problemItem: any) => (
          <ProblemItem
            id={problemItem.problem_id}
            problem={problemItem.problem}
            description={problemItem.description}
            status={problemItem.status}
            reply={problemItem.reply}
            role="USER"
          />
        ))}
      </div>
      <ReportProblemButton></ReportProblemButton>
    </main>
  );
}
