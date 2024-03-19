import FAQlist from '@/components/FAQlist';
import MenuReport from '@/components/MenuReport';

export default function ReportProblem() {
    return (
        <div className="lg:pt-20 pt-5 px-20 text-black">
            <MenuReport />
            <div className="text-center flex flex-col items-center justify-center min-h-screen">
                <h1 className='font-bold lg:text-5xl text-3xl lg:mb-8 md:mb-7 mb-5'>Frequently Asked Questions</h1>
                <h2 className="font-base lg:text-3xl text-xl lg:mb-8 md:mb-7 mb-5">Here are some of the frequently asked questions</h2>
            </div>
            <FAQlist />
        </div>
    )
}








