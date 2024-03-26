"use client";
import replyProblem from "@/libs/replyProblem";
import ReplyProblem from "@/libs/replyProblem";
import React, { useState } from "react";
import RouterBackEventButton from "./RouterBackEventButton";
import { useRouter } from "next/navigation";
import SuccessReplyModal from "./SuccessReplyModal";
import LoadingLine from "./LoadingLine";
import LoadingCircular from "./LoadingCircular";

interface Props {
  problem: string;
  description: string;
  problem_id: string;
  token: string;
}

export default function ReplyForm({
  problem,
  description,
  problem_id,
  token,
}: Props) {
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const [replySuccessModal, setReplySuccessModal] = useState(false);

  const [reply, setReply] = useState("");
  const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    setIsloading(true);
    event.preventDefault();
    console.log(reply);
    if (reply) {
      try {
        const response = await replyProblem(
          "adminQ",
          description,
          problem,
          problem_id,
          reply,
          "Replied",
          token
        );
        setReplySuccessModal(true);
        setIsloading(false);
        setTimeout(() => {
          router.push("/supportandservice");
          setReplySuccessModal(false);
        }, 4000);
      } catch (err) {
        console.log("Error during reply submit: ", err);
        setIsloading(false);
      }
    } else {
      console.log("Reply Failed");
      setIsloading(false);
    }
  };

  return (
    <main className="h-auto w-full text-black">
      <div className="px-8 pb-4">
        <RouterBackEventButton />
        <div className="mt-20 ml-12 flex-col ">
          <div className="flex justify-end">
            <h1 className="ml-4 text-4xl font-semibold my-4 w-full">
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#F2D22E",
                  textUnderlineOffset: "6px",
                }}
              >
                Problem:
              </span>
              {` ${problem}`}
            </h1>
          </div>
          <div className="bg-white mt-12 relative border border-slate-400 rounded-xl h-auto w-full">
            <div className="absolute -top-6 left-8">
              <div className="text-lg font-medium text-gray-600 px-12 py-2 bg-[#F2D22E] rounded-lg ">
                Detail
              </div>
            </div>
            <div className="px-8 pt-8 pb-6">{description}</div>
          </div>
          <div className="w-full h-[1px] bg-gray-600 mt-12"></div>
          <form onSubmit={handleFormSubmit}>
            <h2 className="mt-8 text-2xl">Your Reply:</h2>
            <textarea
              id="reply"
              name="reply"
              value={reply}
              onChange={handleReplyChange}
              className="mt-4 border border-slate-400 rounded-xl h-[200px] w-full focus:outline-none p-4 resize-none"
              placeholder="Write your reply here ..."
            ></textarea>
            <div className="flex mt-4 items-center pr-8">
              <button
                type="submit"
                className=" text-white px-12 py-4 rounded-full bg-[#F2D22E] hover:bg-yellow-500 mr-8"
              >
                Send
              </button>
              {isLoading && <LoadingLine></LoadingLine>}
            </div>
          </form>
        </div>
      </div>
      <SuccessReplyModal
        successReplyModal={replySuccessModal}
        setSuccessReplyModal={setReplySuccessModal}
      ></SuccessReplyModal>
    </main>
  );
}
