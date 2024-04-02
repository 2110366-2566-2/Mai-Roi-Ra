import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const CommentBox = () => {
    return (
        <div>
            <div className="w-full flex flex-row justify-center space-x-3">
                <div className="flex items-center">
                    <ArrowBackIosIcon className="cursor-pointer"/>
                </div>

                <div className="border-black rounded-2xl border-[1px] w-[330px] h-[270px]">

                </div>

                <div className="flex items-center">
                    <ArrowForwardIosIcon className="cursor-pointer"/>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center mt-[20px] cursor-pointer">
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