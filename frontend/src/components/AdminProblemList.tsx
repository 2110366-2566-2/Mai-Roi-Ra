import ProblemItem from "./ProblemItem";

interface Props {
  datas: any[];
}

export default function AdminProblemList({ datas }: Props) {
  console.log(datas);
  return (
    <main className="text-black flex flex-col h-auto overflow-hidden">
      <div className="my-8 px-4 lg:px-10">
        {datas.map((problemItem: any) => (
          <ProblemItem
            id={problemItem.problem_id}
            problem={problemItem.problem}
            description={problemItem.description}
            status={problemItem.status}
            reply=""
            role="ADMIN"
          />
        ))}
      </div>
    </main>
  );
}
