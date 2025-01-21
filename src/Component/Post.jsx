import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

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

const ElapsedTime = ({ timestamp }) => {
  const [elapsedTime, setElapsedTime] = useState(
    calculateElapsedTime(timestamp)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(calculateElapsedTime(timestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <span className="ml-1 text-gray-500">{formatElapsedTime(elapsedTime)}</span>
  );
};

const Post = ({ posts }) => {
  return (
    <div className="space-y-6 flex flex-col items-center">
      {posts
        .slice()
        .reverse()
        .map((post) => (
          <div className="card bg-white w-[550px] shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-4">
            <div className="card-header p-3 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium bg-blue-100 px-2 rounded-full">
                  {post?.communityName || "Unknown Community"}
                </span>
                <span className= " mx-3 bg-green-100 px-2 rounded-full">{post?.userName || "Anonymous"}</span > 
                <span className="bg-lime-200 px-2 rounded-full">{post?.createdAt && <ElapsedTime timestamp={post.createdAt} />}</span>
              </div>
            </div>
            <hr className="border-dotted border-gray-400" />
            <div className="card-body p-5">
              <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                {post?.title || "Untitled Post"}
              </h2>
              <p className="text-sm text-blue-500 mt-2">
                {post?.flair || "No Flair"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {post?.content?.split(" ").slice(0, 15).join(" ") ||
                  "No content available"}
                ...
              </p>
              <div className="mt-4 flex items-center justify-around text-sm text-gray-500">
                <span className="flex items-center justify-center gap-1 border p-1 rounded-full">
                  <button>
                    <BiUpvote className="text-xl" />
                  </button>
                  <p>2</p>
                  <button>
                    <BiDownvote className="text-xl" />
                  </button>
                </span>
                <span>👁️ {post?.views || 0} Views</span>
                <span>💬 {post?.comments?.length || 0} Comments</span>
                <span className="text-blue-400 font-medium">
                  <Link to={`/postD/${post._id}`}>View More</Link>
                </span>
              </div>
            </div>
            <div></div>
          </div>
        ))}
    </div>
  );
};

export default Post;
