'use client'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
    post_lists:Array<Object>;
}

const CommentBox = ({post_lists} : Props) => {

    const [curr, setCurr] = useState(0);

    const prev = () => {
        setCurr((curr) => (curr === 0 ? post_lists.length - 1 : curr - 1));
    }

    const next = () => {
        setCurr((curr) => (curr === post_lists.length - 1 ? 0 : curr + 1));
    }

    // useEffect(() => {
    //     if (!autoSlide) return
    //     const slideInterval = setInterval(next, autoSlideInterval)
    //     return () => clearInterval(slideInterval)
    // }, [])

    return (
        <div className="w-full h-full space-y-[2%]">
            <div className="w-full h-[70%] flex flex-row justify-center">
                <div className="flex flex-row justify-center items-center h-full w-[10%]">
                    <div className="w-fit h-fit" onClick={prev}>
                        <ArrowBackIosIcon className="cursor-pointer"/>
                    </div>
                </div>

                <div className="border-black rounded-2xl border-[1px] h-full w-[80%] overflow-hidden relative flex transition duration-150 ease-in-out">
                    <div style={{ transform: `translateX(-${curr * 100}%)` }} className="flex transition-transform duration-150 ease-linear w-full">
                        {post_lists.map((post, index) => (
                        <div key={post.post_id} className="flex-1 flex-wrap min-w-full flex p-4 text-lg font-medium">
                            <div className="w-full h-[20%] flex flex-row justify-start">

                                <div className="h-full w-[20%] flex items-center justify-center">
                                    <Image className="w-[40px] h-[40px] rounded-full"
                                    src="/img/profile_picture.png"
                                    alt="profile image"
                                    width={1000}
                                    height={1000}/>
                                </div>

                                <div>
                                    <div>
                                        {post.username}
                                    </div>

                                    <div>
                                        <Rating className="text-[17px]" defaultValue={post.rating_score} precision={0.01} max={5} readOnly/>
                                    </div>
                                </div>

                            </div>

                            <div className="w-full">
                                {post.caption}
                            </div>

                            <div className="w-full">
                                <div className="text-gray-400">
                                    Organizers Response:
                                </div>
                                <div>
                                    {post.organizer_response}
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-row justify-center items-center h-full w-[10%]">
                    <div className="w-fit h-fit" onClick={next}>
                        <ArrowForwardIosIcon className="cursor-pointer"/>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center lg:items-end items-center h-[28%] cursor-pointer">
                <div className="flex flex-row justify-center items-center bg-[#F2D22E] py-3 px-2 rounded-2xl space-x-2 w-[70%]">
                    <div>
                        <QuestionAnswerIcon className="text-[40px]"/>
                    </div>
                    
                    <div className="text-[30px]">
                        Answer
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CommentBox;