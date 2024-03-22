"use client";
import React from "react";
import ProblemItem from "@/components/ProblemItem";
import Link from "next/link";

interface Props {
    datas: any[];
  }
  


export default function ProblemList({datas}: Props) {
  return (
    <div className="w-full">
      <div className="mt-8 px-10">
        {datas.map((problemItem: any) => (
          <ProblemItem
            id={problemItem.problem_id}
            name={problemItem.problem}
            description={problemItem.description}
          />
        ))}
      </div>
    </div>
  );
}
