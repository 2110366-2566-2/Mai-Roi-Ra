'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation"
import ProblemPopUp from './ProblemPopUp';

interface Props {
  id: string;
  problem: string;
  description: string;
}

export default function ProblemItem({ id, problem, description }: Props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center my-4 shadow-md lg:h-[200px] md:h-[160px] h-[120px] p-2 lg:p-10 w-full hover:scale-105 duration-300">

        <div className='h-full flex flex-col justify-start w-full space-y-[7px] mx-10' >
          <div className='flex justify-between'>
            <h2 className="lg:text-2xl md:text-xl sm:text-md text-md  font-semibold">{problem}</h2>
          </div>

          <div className="">
            {description && <div className="hidden sm:block break-words"><p className='text-wrap break-words'>{description}</p></div>}
          </div>

        </div>
      </div>
    </div>
  );
};


