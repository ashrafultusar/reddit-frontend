import { useState, useEffect } from "react";
import SinglePost from "./SinglePost";

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

export const ElapsedTime = ({ timestamp }) => {
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
      {posts?.map((post, index) => (
        <SinglePost key={index} post={post} />
      ))}
    </div>
  );
};

export default Post;
