const ProfileUserInformationSkeleton = () => (
  <div className="animate-pulse pl-4 pt-4">
    <div className="rounded-full bg-gray-300 w-24 h-24"></div>
    <div className="mt-4 ml-1">
      <div className="h-4 bg-gray-300 rounded w-[125%]"></div>
      <div className="h-4 bg-gray-300 rounded w-[100%] mt-2"></div>
      <div className="h-4 bg-gray-300 rounded w-[150%] mt-2"></div>
    </div>
  </div>
);

const EditProfileButtonSkeleton = () => (
  <div className="flex flex-col">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded-full w-24 lg:w-36"></div>
    </div>
    <div className="animate-pulse mt-24">
      <div className="h-8 bg-gray-300 rounded-lg w-24 lg:w-36"></div>
    </div>
  </div>
);

const EventsListSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex space-x-4">
        <div className="h-20 w-20 bg-gray-300 rounded"></div>
        <div className="flex-1 space-y-3 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

const ProfilePageSkeleton = () => (
  <div className="bg-white text-black">
    <div className="lg:mr-24 border-r border-b bg-white min-h-screen">
      <div className="w-full h-[200px] bg-gray-300"></div>

      <div className="flex justify-between p-4">
        <ProfileUserInformationSkeleton />
        <EditProfileButtonSkeleton />
      </div>

      {/* Events Section Title Skeleton */}
      <div className="bg-white w-full h-[50px] flex justify-center items-center border-b">
        <div className="animate-pulse h-6 bg-gray-300 w-1/3 rounded-lg"></div>
      </div>

      {/* Events List Skeleton */}
      <div className="pt-8 pl-10">
        <EventsListSkeleton />
      </div>
    </div>
  </div>
);

export default ProfilePageSkeleton;
