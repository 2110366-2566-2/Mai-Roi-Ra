

export default function ParticipantProfileModal({ user_id }: { user_id: string }) {


    return (
        <>
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <img src="/img/profile_picture.png" alt="Profile Picture" className="w-20 h-20 rounded-full border-4 border-white" />
                </div>
            </div>
            <div>
                <img src="/img/navy_background_picture.png" alt="Profile Cover Photo" className="w-full h-40 object-cover" />
            </div>
            <div className="mt-4">
                {/* Your content here */}
            </div>
        </>

    );
}
