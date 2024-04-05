import React from "react";

const EventItemSkeleton = () => (
  <div className="flex items-center my-4 shadow-md lg:h-[200px] md:h-[160px] h-[120px] p-2 lg:p-5 w-full">
    <div className="flex-shrink-0 mr-4 h-full lg:w-[200px] md:w-[160px] w-[120px] bg-gray-300 rounded"></div>
    <div className="h-full flex flex-col justify-start w-full space-y-[7px]">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      <div className="text-gray-500 h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

const SearchBarSkeleton = () => (
  <div className="flex-shrink-0 pt-8 px-10">
    <div className="font-bold lg:text-5xl md:text-4xl text-3xl lg:mb-8 mb-5 h-12 bg-gray-300 rounded w-1/4"></div>
    <div className="h-10 bg-gray-200 rounded w-full max-w-md"></div>
  </div>
);

const UserHomepageSkeleton = () => {
  return (
    <main className="text-black flex flex-col">
      <SearchBarSkeleton />
      <div className="bg-white py-1 mt-[20px] mx-8">
        <EventItemSkeleton />
        <EventItemSkeleton />
        <EventItemSkeleton />
        <EventItemSkeleton />
        <EventItemSkeleton />
        <EventItemSkeleton />
        {/* Repeat EventItemSkeleton as many times as needed */}
      </div>
    </main>
  );
};

export default UserHomepageSkeleton;
