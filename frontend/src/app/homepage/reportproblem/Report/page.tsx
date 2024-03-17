import styles from "@/styles/FontPage.module.css"
import CreateProblemForm from "@/components/CreateProblemForm";
import MenuReport from '@/components/MenuReport';


const ReportProblemPage = () => {
    return (
        <div className='lg:pt-20 pt-5 px-20 text-black'>
            {/* Topic */}
            <MenuReport/>
            <h1 className='font-bold lg:text-5xl text-3xl lg:mb-[50px] md:mb-7 mb-5'>What’s happening?</h1>

            {/* Form */}
            <div className="">
                <CreateProblemForm/>
            </div>

        </div>
    )
}

export default ReportProblemPage;