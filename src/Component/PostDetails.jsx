import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `https://backend-ten-indol-40.vercel.app/api/posts/${postId}`
        );
        if (!response.ok) throw new Error("Failed to fetch post details");

        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        setError(error.message); // Handle the error
        console.error("Error fetching post:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (error) return <div>Error: {error}</div>; // Display error message if there's an issue
  if (!post) return <div>Loading...</div>; // Show loading state if post data is not available yet

  return (
    <div className="">
      <div className="py-10">
        {/* Post Header Section */}
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            {/* Community Name and Timestamp */}
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-[16px] bg-blue-100 px-2 rounded-full mr-2">
                {post?.communityName}
              </span>{" "}
              |{" "}
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
                <span>👁️ 1,023 Views</span>
                <span>💬 4 Comments</span>
              </div>
              <div>
                <Link to={`/comment-page/${postId}`}className="btn">
                  Add Comment
                </Link>
              </div>
            </div>
          </div>
          <hr className="" />
        </div>
      </div>

      {/* comment show here */}
      <div  className="max-w-2xl">
        <div className="bg-white p-4 rounded-lg ">
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold text-gray-700 mr-2">
              User Name
            </p>
            <span className="text-sm text-gray-500">|</span>
            <p className="ml-2 text-sm text-gray-500">comment time show</p>
          </div>
          <p className="text-gray-600 mb-3">{"comment"}</p>
          <Link 
            to={`/comment-page/${postId}`}
            className="inline-block bg-[#e8dfdf] text-[#9c4f4f] rounded-full px-4 py-2 text-sm font-semibold hover:bg-[#d1c1c1] transition-colors duration-300"
          >
            Reply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
