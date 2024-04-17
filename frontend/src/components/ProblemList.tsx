import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import ProblemItem from "./ProblemItem";

import ReportProblemButton from "./ReportProblemButton";

interface Props {
  datas: any[];
}

export default function ProblemList({ datas }: Props) {
  console.log(datas);
  return (
    <main className="text-black flex flex-col">
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
