import Image from "next/image"

export default function BookingInstruction(){
    return (
        <div className="md:mt-[120px] font-bold">
            <div className="flex flex-row flex-wrap">
                <div className="mt-[20px] text-[40px]">
                    Our Campground Booking
                </div>
                <div>
                    <Image src="/images/logoBookingPage.png"
                    alt="Error to load picture"
                    width={100}
                    height={100}/>
                </div>
            </div>
            <div className="">
                <p>___________________________________________</p>
            </div>
            <div className="w-full lg:w-[70%] mt-[20px] space-y-[10px]">
                <div>
                ✨ Traveler-Friendly: Enter your details with ease, starting with your name. Our user-friendly form 
                ensures a seamless booking experience.
                </div>
                <div>
                🏞️ Choose Your Spot: Indicate your preferred campground
                </div>
                <div>
                📅 Reserve Your Dates: Select your desired dates with our interactive calendar.
                </div>
                <div>
                👫 Perfect for Groups: Specify the number of people joining your camping expedition. 
                </div>
            </div>
        </div>
    )
}