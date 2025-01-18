// import React from "react";
// import Post from "../Component/Post";
// import useFetchPosts from "../Hook/useFetchPosts";

// const Home = () => {
//   const posts = useFetchPosts();

//   return (
//     <div className="">
//       <div className="flex justify-between mb-10">
//         <p className="text-black text-2xl font-bold">
//           All Posts: {posts?.length}
//         </p>
//         <div className="flex items-center justify-center gap-4">
//           <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Newest</p>
//           <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Oldest</p>
//           <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Active</p>
//         </div>
//       </div>
//       <hr className="bg-black h-[2px] mb-6" />
//       <div>
//         <Post posts={posts} />
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import Post from "../Component/Post";
import useFetchPosts from "../Hook/useFetchPosts";

const Home = () => {
  const posts = useFetchPosts();

  return (
    <div className="space-y-6 flex flex-col h-screen overflow-x-hidden">
      {/* Header Section with Post Count and Sorting */}
      <div className="flex justify-between mb-10 sticky top-0 z-10">
        <p className="text-black text-2xl font-bold">
          All Posts: {posts?.length}
        </p>
        <div className="flex items-center justify-center gap-4">
          <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Newest</p>
          <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Oldest</p>
          <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Active</p>
        </div>
      </div>

      {/* Remove the height from the hr */}
      <hr className="bg-black mb-6" />

      {/* Post List Section with Scroll */}
      <div className="flex-1 overflow-y-auto">
        <Post posts={posts} />
      </div>
    </div>
  );
};

export default Home;
