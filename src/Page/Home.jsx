import React, { useContext, useEffect } from "react";
import Post from "../Component/Post";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const Home = () => {
  const { posts, setData, sortOrder, setSortOrder, searchText } =
    useContext(AuthContext);

  useEffect(() => {
 
    axios.get("http://localhost:8000/api/posts").then((response) => {
      const fetchedPosts = response.data;

    
      const sortedData = sortPosts(fetchedPosts, sortOrder);
      setData(sortedData);
    });
  }, [sortOrder]); 


  const sortPosts = (posts, order) => {
    return posts.sort((a, b) => {
      if (order === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (order === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (order === "activity") {
       
        const latestCommentA = a.comments.length
          ? new Date(
              Math.max(
                ...a.comments.map((comment) =>
                  new Date(comment.createdAt).getTime()
                )
              )
            )
          : new Date(a.createdAt);
        const latestCommentB = b.comments.length
          ? new Date(
              Math.max(
                ...b.comments.map((comment) =>
                  new Date(comment.createdAt).getTime()
                )
              )
            )
          : new Date(b.createdAt);

        return latestCommentB - latestCommentA; 
      }
      return 0; 
    });
  };


  const handleSortClick = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="space-y-6 flex flex-col h-screen overflow-x-hidden">
    
      <div className="flex justify-between mb-10 sticky top-0 z-10">
        <div>
          <p className="text-black text-2xl font-bold">
            All Posts: {posts?.length}
          </p>
          {searchText && (
            <p className="text-2xl font-bold mt-2">
              Search Text:{" "}
              <span className="text-xl font-medium ">{searchText}</span>
            </p>
          )}
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            className={`px-3 py-1 rounded-md cursor-pointer ${
              sortOrder === "newest"
                ? "bg-blue-500 text-white"
                : "bg-[#dcdcdc] text-black"
            }`}
            onClick={() => handleSortClick("newest")}
          >
            Newest
          </button>
          <button
            className={`px-3 py-1 rounded-md cursor-pointer ${
              sortOrder === "oldest"
                ? "bg-blue-500 text-white"
                : "bg-[#dcdcdc] text-black"
            }`}
            onClick={() => handleSortClick("oldest")}
          >
            Oldest
          </button>
          <button
            className={`px-3 py-1 rounded-md cursor-pointer ${
              sortOrder === "activity"
                ? "bg-blue-500 text-white"
                : "bg-[#dcdcdc] text-black"
            }`}
            onClick={() => handleSortClick("activity")}
          >
            Activity
          </button>
        </div>
      </div>

    
      <hr className="bg-black mb-6" />

      {/* Post List Section */}
      <div className="flex-1 overflow-y-auto">
        <Post posts={posts} />
      </div>
    </div>
  );
};

export default Home;
