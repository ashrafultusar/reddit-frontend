import React from "react";
import { Link } from "react-router-dom";
import { BiDownvote, BiUpvote } from "react-icons/bi";

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


const ViewCommunity = () => {
  return (
    <div>
      {/* Community details */}
      <div className="mb-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">Community Name</h1>
          <div className="flex items-center justify-center gap-4">
            <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Newest</p>
            <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Oldest</p>
            <p className="bg-[#dcdcdc] text-black px-3 py-1 rounded-md">Active</p>
          </div>
        </div>
        <div className="mt-4 space-y-1 mb-2">
          <p>Community description goes here.</p>
          <p>Created: 5 minutes ago</p>
          <div className="flex">
            <p>Posts: 10</p>
            <p className="mx-2">|</p>
            <p>Members: 150</p>
          </div>
        </div>
      </div>
      <hr className="bg-black h-1" />

      {/* All posts */}
      <div className="space-y-6 flex flex-col items-center mt-6">
        <div className="card bg-white w-[550px] shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <div className="card-header p-3 flex justify-between items-center">
            <div className="text-sm text-gray-600">
                          <span className="font-medium mr-2">user name</span>
                          <span >created time</span>
            </div>
          </div>
          <hr className="border-dotted border-gray-400" />
          <div className="card-body p-5">
            <h2 className="text-xl font-semibold text-gray-800 leading-tight">Sample Post Title</h2>
            <p className="text-sm text-blue-500 mt-2">General Discussion</p>
            <p className="text-sm text-gray-600 mt-2">
              This is a static description of the post content, limited to a few lines.
            </p>
            <div className="mt-4 flex items-center justify-around text-sm text-gray-500">
              <span className="flex items-center justify-center gap-1 border p-1 rounded-full">
                <button>
                  <BiUpvote className="text-xl" />
                </button>
                <p>12</p>
                <button>
                  <BiDownvote className="text-xl" />
                </button>
              </span>
              <span>👁️ 120</span>
              <span>💬 8</span>
              <span className="text-blue-400 font-medium">
                <Link to="/postD">View More</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCommunity;
