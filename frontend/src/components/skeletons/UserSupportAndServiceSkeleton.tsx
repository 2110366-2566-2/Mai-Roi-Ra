import React from "react";

const FAQItemSkeleton = () => (
  <div className="w-full h-12 bg-gray-300 rounded-md"></div>
);

const FAQListSkeleton = () => (
  <div className="flex flex-wrap">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="w-1/2 p-4 mt-6 px-4 sm:px-10 animate-pulse">
        <FAQItemSkeleton />
      </div>
    ))}
  </div>
);

const UserSupportAndServiceSkeleton = () => (
  <div className="lg:mr-24 border-r border-b bg-white h-screen">
    {/* Tabs */}
    <div className="w-full text-2xl pt-20 border-b pl-4 pb-2">
      <div className="flex justify-start">
        <div className="bg-gray-300 h-10 w-32 rounded-md mr-2 animate-pulse"></div>
        <div className="bg-gray-300 h-10 w-32 rounded-md animate-pulse"></div>
      </div>
    </div>
    {/* Title */}
    <div className="text-center my-10 px-10">
      <div className="bg-gray-300 h-12 rounded-lg w-full mx-auto mb-4 animate-pulse"></div>
      <div className="bg-gray-300 h-6 rounded-lg w-1/2 mx-auto animate-pulse"></div>
    </div>
    {/* FAQ List */}
    <FAQListSkeleton />
  </div>
);

export default UserSupportAndServiceSkeleton;
