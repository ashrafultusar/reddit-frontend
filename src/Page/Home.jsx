import React from "react";
import Post from "../Component/Post";

const Home = () => {
  return (
    <div className="">
      <div className="flex justify-between mb-12">
        <p className="text-black text-2xl font-bold">All Posts</p>
        <div className="flex items-center justify-center gap-4">
          <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Newest</p>
          <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Oldest</p>
          <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Active</p>
        </div>
      </div>
      <hr className="bg-black h-[2px] mb-6" />
      <Post />
    </div>
  );
};

export default Home;
