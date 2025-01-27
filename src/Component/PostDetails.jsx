import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments";

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

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    axios(`http://localhost:8000/api/posts/${postId}`)
      .then((res) => setPost(res?.data))
      .catch((err) => setError(err?.message));
    viewCount();
  }, [postId]);

  

  const viewCount = () => {
    axios
      .patch("http://localhost:8000/api/posts/views", { postId })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  if (error) return <div>Error: {error}</div>; 
  if (!post) return <div>Loading...</div>; 

  return (
    <div className="">
      <div className="pt-10">
      
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
           
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-[16px] bg-blue-100 px-2 rounded-full mr-2">
                {post?.communityName}
              </span>
              <span>
                <span className="bg-lime-200 px-2 rounded-full ml-1">
                  {post?.createdAt && (
                    <ElapsedTime timestamp={post.createdAt} />
                  )}
                </span>
              </span>
            </div>
            {/* Username */}
            <div className="text-sm text-gray-500 mt-4">
              <span className="font-medium bg-blue-100 px-2 rounded-full ">
                Posted by: {post?.author}
              </span>
            </div>
            {/* Post Title */}
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              {post?.title}
            </h1>
            {/* Link Flair */}
            <div className="mt-2">
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                History
              </span>
            </div>
            {/* Post Content */}
            <p className="text-gray-700 mt-4">{post?.content}</p>
            {/* View and Comment Count */}
            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <div className="flex space-x-4">
                <span>👁️ {post?.views}</span>
                <span>💬 4 Comments</span>
              </div>
              <div>
                <Link
                  to={`/comment-page/${postId}`}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Add Comment
                </Link>
              </div>
            </div>
          </div>
          <hr className="" />
        </div>
      </div>
      <Comments postId={postId} />
    </div>
  );
};

export default PostDetails;
