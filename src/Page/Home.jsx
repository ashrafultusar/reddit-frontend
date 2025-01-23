import React, { useEffect, useState } from "react";
import Post from "../Component/Post";
import axios from "axios";

const Home = () => {
  const [posts, setData] = useState([]); // Store fetched posts
  const [sortOrder, setSortOrder] = useState("newest"); // Track sort order

  useEffect(() => {
    // Fetch posts from API
    axios.get("http://localhost:8000/api/posts").then((response) => {
      const fetchedPosts = response.data;

      // Sort posts based on sortOrder
      const sortedData = sortPostsByCreatedAt(fetchedPosts, sortOrder);
      setData(sortedData);
    });
  }, [sortOrder]); // Re-run effect when sortOrder changes

  // Sorting function
  const sortPostsByCreatedAt = (posts, order) => {
    return posts.sort((a, b) => {
      if (order === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (order === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
  };

  // Handle sort order click
  const handleSortClick = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="space-y-6 flex flex-col h-screen overflow-x-hidden">
      {/* Header Section with Post Count and Sorting */}
      <div className="flex justify-between mb-10 sticky top-0 z-10">
        <p className="text-black text-2xl font-bold">
          All Posts: {posts?.length}
        </p>
        <div className="flex items-center justify-center gap-4">
          <p
            className={`px-3 py-1 rounded-md cursor-pointer ${
              sortOrder === "newest" ? "bg-blue-500 text-white" : "bg-[#dcdcdc] text-black"
            }`}
            onClick={() => handleSortClick("newest")}
          >
            Newest
          </p>
          <p
            className={`px-3 py-1 rounded-md cursor-pointer ${
              sortOrder === "oldest" ? "bg-blue-500 text-white" : "bg-[#dcdcdc] text-black"
            }`}
            onClick={() => handleSortClick("oldest")}
          >
            Oldest
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="bg-black mb-6" />

      {/* Post List Section */}
      <div className="flex-1 overflow-y-auto">
        <Post posts={posts} />
      </div>
    </div>
  );
};

export default Home;
