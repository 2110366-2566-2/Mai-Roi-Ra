import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const CommentBox = () => {
    return (
        <div className="w-full h-full space-y-[2%]">
            <div className="w-full h-[70%] flex flex-row justify-center">
                <div className="flex flex-row justify-center items-center h-full w-[10%]">
                    <ArrowBackIosIcon className="cursor-pointer"/>
                </div>

                <div className="border-black rounded-2xl border-[1px] h-full w-[80%]">

                </div>

                <div className="flex flex-row justify-center items-center h-full w-[10%]">
                    <ArrowForwardIosIcon className="cursor-pointer"/>
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