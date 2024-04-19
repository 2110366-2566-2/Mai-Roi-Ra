import CloseIcon from '@mui/icons-material/Close';
import getProblem from "@/libs/getProblem";
import styles from "@/styles/FontPage.module.css";
import { useEffect, useState } from 'react';

interface Props {
    isVisible: boolean;
    onClose: Function;
    id: string;
    problem: string;
    description: string;
    reply: string;
}

const ProblemPopUp = ({ isVisible, onClose, id, problem , description,reply}:{isVisible:boolean, onClose:any, id:string, problem:any, description:any, reply:any}) => {
    const [error, setError] = useState(0);
    const [iconSize, setIconSize] = useState('100px');

    const updateSize = () => {``
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) { // For small devices
            setIconSize('40px');
        } else if (screenWidth >= 768 && screenWidth < 1024) { // For medium devices
            setIconSize('50px');
        } else { // For large devices and up
            setIconSize('70px');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateSize);
        updateSize(); // Set initial size

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleClose = () => {
        setError(0);
        onClose();
    }

    if (!isVisible) return null;

    return (
        <div className={`w-screen h-screen fixed inset-0 z-20 top-0 left-0 flex flex-row justify-center items-center bg-opacity-25 bg-black ${styles.Roboto}`}>
            <div className="lg:w-[1000px] lg:h-[450px] md:w-[500px] md:h-[350px] w-[350px] h-[300px] bg-white pt-[5px] z-20 rounded-3xl">
                <div className="flex w-full justify-end pr-[10px]">
                    <div className="px-4 py-2 flex cursor-pointer items-center w-fit">
                        <CloseIcon className="cursor-pointer" onClick={handleClose} />
                    </div>
                </div>
                <div className="px-5">
                    <div className="text-5xl md:text-4xl sm:text-3xl text-lg font-medium w-fit flex items-center rounded-3xl px-4 py-2 relative flex-row">
                        {problem}
                    </div>
                    <hr className="w-1/2 border-black my-2 ml-5"></hr>
                    <div className="text-xl md:text-xl sm:text-xl text-base w-fit flex items-center rounded-3xl px-4 py-2 relative flex-row">
                        {description}
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-yellow-200 rounded-xl p-4 mb-2" style={{ backgroundColor: '#F2D22E' }}>
                            <span className="text-xl text-black">Reply from Admin</span>
                        </div>
                    </div>
                    <div className="text-xl md:text-xl sm:text-xl text-base flex flex-col flex-grow">
                        <div className="border border-gray-300 rounded-xl p-4 mb-2 flex-grow">
                        {/* Temporary Reply */}
                        {reply}
                        </div>
                    </div>
                </div>


                </div>

                </div>

            
    );
};

export default ProblemPopUp;
