import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import axios from "axios";

const calculateElapsedTime = (timestamp) => {
  const now = new Date();
  const pastTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - pastTime) / 1000);
  return diffInSeconds;
};

const formatElapsedTime = (seconds) => {
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

const ViewCommunity = () => {
  const { communityName } = useParams();
  const [community, setCommunity] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sortOrder, setSortOrder] = useState("Newest"); // State for sorting order

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/communities/${communityName}`)
      .then((res) => {
        setCommunity(res.data);
        const diffInSeconds = calculateElapsedTime(res.data.createdAt);
        setElapsedTime(diffInSeconds);
      })
      .catch((err) => {
        console.error("Error fetching community details:", err);
      });
  }, [communityName]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!community) return <p>Loading...</p>;

  // Sorting logic based on sortOrder
  const sortedPosts =
    community?.posts?.slice().sort((a, b) => {
      if (sortOrder === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    }) || [];
// console.log(sortedPosts);
  return (
    <div>
      {/* Community details */}
      <div className="mb-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">{community?.communityName}</h1>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setSortOrder("Newest")}
              className={`bg-[#dcdcdc] text-black px-3 py-1 rounded-md ${
                sortOrder === "Newest" ? "font-bold" : ""
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortOrder("Oldest")}
              className={`bg-[#dcdcdc] text-black px-3 py-1 rounded-md ${
                sortOrder === "Oldest" ? "font-bold" : ""
              }`}
            >
              Oldest
            </button>
          </div>
        </div>
        <div className="mt-4 space-y-1 mb-2">
          <p>{community?.description}</p>
          <p>Created: {formatElapsedTime(elapsedTime)}</p>
          <div className="flex">
            <p>Posts: {sortedPosts?.length}</p>
            <p className="mx-2">|</p>
            <p>Members: {community?.membersCount}</p>
          </div>
        </div>
        
      </div>
      <hr className="bg-black h-1" />

      {/* All posts */}
      {sortedPosts.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-red-500 text-xl font-semibold">
            No Post Available
          </p>
        </div>
      ) : (
        <div className="space-y-6 flex flex-col items-center mt-6">
          {sortedPosts.map((post, index) => (
            <div
              key={index}
              className="card bg-white w-[550px] shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="card-header p-3 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="font-medium bg-blue-100 px-2 rounded-full mr-2">{post.author}</span>
                  <span className="bg-green-100 px-2 rounded-full">
                    {formatElapsedTime(calculateElapsedTime(post.createdAt))}
                  </span>
                </div>
              </div>
              <hr className="border-dotted border-gray-400" />
              <div className="card-body p-5">
                <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm text-blue-500 mt-2">{post.category}</p>
                <p className="text-sm text-gray-600 mt-2">{post.content}</p>
                <div className="mt-4 flex items-center justify-around text-sm text-gray-500">
                  <span className="flex items-center justify-center gap-1 border p-1 rounded-full">
                    <button>
                      <BiUpvote className="text-xl" />
                    </button>
                    <p>{post.upvotes}</p>
                    <button>
                      <BiDownvote className="text-xl" />
                    </button>
                  </span>
                  <span>👁️ {post.views}</span>
                  <span>💬 {post.commentsCount}</span>
                  <span className="text-blue-400 font-medium">
                    <Link to={`/postD/${post._id}`}>View More</Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCommunity;
