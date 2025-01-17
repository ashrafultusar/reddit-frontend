import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Utility function to calculate elapsed time since the post's createdAt timestamp
const calculateElapsedTime = (timestamp) => {
  const now = new Date();
  const pastTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - pastTime) / 1000); // Difference in seconds
  return diffInSeconds;
};

// Function to format the elapsed time into a readable format
const formatElapsedTime = (seconds) => {
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

// ElapsedTime component to display the elapsed time from the post creation
const ElapsedTime = ({ timestamp }) => {
  const [elapsedTime, setElapsedTime] = useState(calculateElapsedTime(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(calculateElapsedTime(timestamp));
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timestamp]);

  return <span className="ml-1 text-gray-500">{formatElapsedTime(elapsedTime)}</span>;
};

// Post Component to display all posts
const Post = ({ posts }) => {
  console.log(posts);
  return (
    <div className="space-y-6 flex flex-col items-center">
      {posts.map((post) => (
        <Link to={"/postD"} key={post.id}>
          <div className="card bg-white w-[550px] shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-4">
            <div className="card-header p-3 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{post?.communityName}</span> •
                <span className="ml-1">user name</span> •
                <ElapsedTime timestamp={post?.createdAt} />
              </div>
            </div>
            <hr className="border-dotted border-gray-400" />
            <div className="card-body p-5">
              <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                {post?.title}
              </h2>
              <p className="text-sm text-blue-500 mt-2">Link Flair (optional)</p>
              <p className="text-sm text-gray-600 mt-2">
                {post?.content.split(" ").slice(0, 15).join(" ")}...
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>👁️ 1,023 Views</span>
                <span>💬 4 Comments</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Post;
