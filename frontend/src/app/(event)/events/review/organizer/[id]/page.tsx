import Image from "next/image";
import getEvent from "@/libs/getEvent";
import Rating from '@mui/material/Rating';
import DescriptionIcon from '@mui/icons-material/Description';
import LinearProgress from '@mui/joy/LinearProgress';
import CommentBox from "@/components/CommentBox";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";

interface Props {
    params: {id:string}
}

export default async function OrganizerReviewEventById({ params }: Props) {
    const event = await getEvent(params.id);
    console.log(event);

    return (
        <div className="w-screen md:h-screen">
            <div className="w-full h-[7%] pl-[3%] pt-[30px] pb-[10px]">
                <Link href="/review">
                    <div className="w-fit h-fit">
                        <ArrowBackIosNewIcon className="text-[#1DA1F2] hover:scale-105 cursor-pointer" />
                    </div>
                </Link>
            </div>  

            <div className="font-bold h-[7%] text-[30px] w-full px-[5%] pb-[1%]">
                {event.event_name}
            </div>

            <div className="flex flex-row flex-wrap h-[84%] mx-[5%] lg:space-x-[4%] lg:space-y-[0] space-y-[20px]">
                <div className="lg:w-[63%] w-full h-full space-y-[4%]">
                    <div className="relative md:h-[75%] h-[300px] w-full max-h-[75%]">
                        <Image
                            src={event.event_image}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                            alt="event image"
                        /> 
                    </div>

                    <div className="fex-grow h-[21%] w-full items-center border-[1px] relative">
                        <div className="border-gray-400 px-[20px] relative w-full h-full">   

                            <div className="text-[20px] pt-[40px] pb-[20px] overflow-hidden text-wrap">
                                Songkran in Thailand, April 13-15, features water fights, family blessings, 
                                temple visits, and vibrant street parties, symbolizing renewal and community spirit.
                            </div>

                        </div>

                        <div className="absolute py-[5px] px-[10px] top-[-20px] left-4 bg-[#F2D57E] rounded-xl flex flex-row justify-center space-x-2 z-20">
                                <DescriptionIcon className="text-[30px]"/>
                                <div className="text-[20px]">
                                    Description
                                </div>
                        </div>
                    </div>

                </div>

                <div className="lg:w-[33%] w-full lg:h-full h-screen flex flex-col lg:space-y-[2%] space-y-[1%] lg:py-[0] py-[4%]">
                    <div className="h-[18%] flex flex-row justify-center w-full flex-wrap border-gray-400 border-b-[1px]">
                        <div className="w-full h-[4%] text-center text-[3.5vh]">
                            Review & Rating
                        </div>
                        <div className="w-full h-[4%] text-center text-[3.5vh]">
                            2.4
                        </div>
                        <div className="py-[7px] h-[4%]">
                            <Rating className="text-[3vh]" value={2.4} precision={0.01} readOnly />
                        </div>
                    </div>

                    <div className="h-[25%] w-full">
                        <div className="py-[4%] flex flex-row items-center h-[16%]">
                            <div className="w-[25%]">
                                <Rating className="text-[17px]" defaultValue={5} max={5} readOnly/>
                            </div>
                            <div className="w-[70%]">
                                <LinearProgress sx={{
                                        backgroundColor: 'rgb(242, 213, 126)',
                                        '& .MuiLinearProgress-bar1Determinate': { // Increased specificity for determinate variant
                                        backgroundColor: 'rgb(255, 174, 39)',
                                        },
                                    }}
                                determinate
                                value={75}/>
                            </div>
                        </div>
                            
                        <div className="flex flex-row items-center h-[16%]">
                            <div className="w-[25%]">
                                <Rating className="text-[17px]" defaultValue={4} max={4} readOnly/>
                            </div>
                            <div className="w-[70%]">
                                <LinearProgress sx={{
                                        backgroundColor: 'rgb(242, 213, 126)',
                                        '& .MuiLinearProgress-bar1Determinate': { // Increased specificity for determinate variant
                                        backgroundColor: 'rgb(255, 174, 39)',
                                        },
                                    }}
                                determinate
                                value={5}/>
                            </div>
                        </div>

                        <div className="flex flex-row items-center h-[16%]">
                            <div className="w-[25%]">
                                <Rating className="text-[17px]" defaultValue={3} max={3} readOnly/>
                            </div>
                            <div className="w-[70%]">
                                <LinearProgress sx={{
                                    backgroundColor: 'rgb(242, 213, 126)',
                                        '& .MuiLinearProgress-bar1Determinate': { // Increased specificity for determinate variant
                                    backgroundColor: 'rgb(255, 174, 39)',
                                    },
                                }}
                                determinate
                                value={10}/>
                            </div>
                        </div>

                        <div className="flex flex-row items-center h-[16%]">
                            <div className="w-[25%]">
                                <Rating className="text-[17px]" defaultValue={2} max={2} readOnly/>
                            </div>
                            <div className="w-[70%]">
                                <LinearProgress sx={{
                                        backgroundColor: 'rgb(242, 213, 126)',
                                        '& .MuiLinearProgress-bar1Determinate': { // Increased specificity for determinate variant
                                        backgroundColor: 'rgb(255, 174, 39)',
                                        },
                                    }}
                                determinate
                                value={8}/>
                            </div>
                        </div>

                        <div className="flex flex-row items-center h-[16%]">
                            <div className="w-[25%]">
                                <Rating className="text-[17px]" defaultValue={1} max={1} readOnly/>
                            </div>
                            <div className="w-[70%]">
                                <LinearProgress sx={{
                                        backgroundColor: 'rgb(242, 213, 126)',
                                        '& .MuiLinearProgress-bar1Determinate': { // Increased specificity for determinate variant
                                        backgroundColor: 'rgb(255, 174, 39)',
                                        },
                                    }}
                                determinate
                                value={7}/>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-end pr-[10px] h-[16%]">
                            143 Ratings
                        </div>
                    </div>

                    <div className="h-[53%] lg:mt-[0] mt-[2%]">
                        <CommentBox/>
                    </div>
                </div>
            </div>
        </div>
    )
}