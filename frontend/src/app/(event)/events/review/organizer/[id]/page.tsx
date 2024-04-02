import Image from "next/image";
import getEvent from "@/libs/getEvent";
import Rating from '@mui/material/Rating';
import RouterBackEventButton from "@/components/RouterBackEventButton";
import DescriptionIcon from '@mui/icons-material/Description';
import LinearProgress from '@mui/joy/LinearProgress';
import CommentBox from "@/components/CommentBox";

interface Props {
    params: {id:string}
}

export default async function OrganizerReviewEventById({ params }: Props) {
    const event = await getEvent(params.id);
    console.log(event);

    return (
        <main className="mx-auto lg:mx-16 px-4 py-0 lg:py-4 h-screen w-full text-black">
            <RouterBackEventButton isEventDetailPage={false}/>

            <div className="lg:mx-16">
                <h1 className="text-3xl font-semibold my-4 w-full">{event.event_name}</h1>
                <div className="flex flex-wrap items-start flex-col w-auto lg:flex-row h-full">
                    <div className="h-full flex flex-col w-auto max-w-[750px] lg:mr-20">
                        <div className="w-full lg:w-[750px] xl:w-full overflow-hidden">
                            <Image
                                src={event.event_image}
                                width={800} 
                                height={400}
                                alt='event image'
                                className="object-cover w-full h-full rounded-lg"
                            />
                        </div>
                        <div className="w-full lg:w-[750px] mt-[50px] border-[1px] border-gray-400 px-[20px] relative">
                            <div className="absolute py-[5px] px-[10px] top-[-20px] left-4 bg-[#F2D57E] rounded-xl flex flex-row justify-center space-x-2">
                                <DescriptionIcon className="text-[30px]"/>
                                <div className="text-[20px]">
                                    Description
                                </div>
                            </div>
                            <div className="text-[20px] pt-[40px] pb-[20px]">
                                Songkran in Thailand, April 13-15, features water fights, family blessings, 
                                temple visits, and vibrant street parties, symbolizing renewal and community spirit.
                            </div>
                        </div>
 
                    </div>
                    <div className="mt-8 lg:mt-0 w-full lg:w-[400px] flex justify-center flex-col">
                        <div className="flex flex-row justify-center flex-wrap border-gray-400 border-b-[1px]">
                            <div className="w-full text-center text-[30px]">
                                Review & Rating
                            </div>
                            <div className="w-full text-center text-[30px]">
                                2.4
                            </div>
                            <div className="my-[12px]">
                                <Rating className="text-[30px]" name="read-only" value={2.4} precision={0.01} readOnly />
                            </div>
                        </div>

                        <div className="py-[20px]">
                            <div className="flex flex-row items-center">
                                <div className="w-[25%]">
                                    <Rating className="text-[17px]" name="read-only" defaultValue={5} max={5} />
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
                            
                            <div className="flex flex-row items-center">
                                <div className="w-[25%]">
                                    <Rating className="text-[17px]" name="read-only" defaultValue={4} max={4} />
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

                            <div className="flex flex-row items-center">
                                <div className="w-[25%]">
                                    <Rating className="text-[17px]" name="read-only" defaultValue={3} max={3} />
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

                            <div className="flex flex-row items-center">
                                <div className="w-[25%]">
                                    <Rating className="text-[17px]" name="read-only" defaultValue={2} max={2} />
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

                            <div className="flex flex-row items-center">
                                <div className="w-[25%]">
                                    <Rating className="text-[17px]" name="read-only" defaultValue={1} max={1} />
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

                            <div className="w-full flex flex-row justify-end pr-[10px]">
                                143 Ratings
                            </div>
                        </div>

                        <div>
                            <CommentBox/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}