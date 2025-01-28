import { BiUpvote, BiDownvote } from "react-icons/bi";
import axios from "axios";
import { Link } from "react-router-dom";
import { ElapsedTime } from "./Post";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const SinglePost = ({ post }) => {
  const { user, userData } = useContext(AuthContext);
  const [vote, setVote] = useState(post?.vote || 0);
  const [localUserVote, setLocalUserVote] = useState(null);

  // Check if the user has already voted
  useEffect(() => {
    const existingVote = post?.voters?.find(
      (voter) => voter.userId === user?.email
    );
    setLocalUserVote(existingVote || null);
  }, [post?.voters, user?.email]);

  const handleVote = (data) => {
    // Update vote locally for immediate feedback
    if (data?.voteType === "upvote") {
      setVote((prev) => prev + 1);
    } else if (data?.voteType === "downvote") {
      setVote((prev) => prev - 1);
    }

    // Update localUserVote state
    setLocalUserVote({ userId: user?.email, voteType: data?.voteType });

    // Send vote to the server
    axios
      .post(`http://localhost:8000/api/posts/votes/${post?._id}`, data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };


  return (
    <div className="card bg-white w-[550px] shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-4">
      <div className="card-header p-3 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <span className="font-medium bg-blue-100 px-2 rounded-full">
            {post?.communityName || "Unknown Community"}
          </span>
          <span className=" mx-3 bg-green-100 px-2 rounded-full">
            {post?.author || "Anonymous"}
          </span>
          <span className="bg-lime-200 px-2 rounded-full">
            {post?.createdAt && <ElapsedTime timestamp={post.createdAt} />}
          </span>
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
        <p className="text-gray-700 mt-4">
          {post?.content?.length > 80
            ? `${post.content.substring(0, 80)}...`
            : post?.content || "No content available"}
        </p>
        <div className="mt-4 flex items-center justify-around text-sm text-gray-500">
          <span
            className={`flex items-center justify-center gap-1 border p-1 rounded-full ${
              localUserVote?.voteType === "upvote" ? "border-orange-500" : ""
            }`}
          >
            <button
              disabled={
                localUserVote?.voteType === "upvote" ||
                userData?.reputation < 50 ||
                !user
              }
              onClick={() =>
                handleVote({
                  email: `${user?.email}`,
                  voteType: "upvote",
                })
              }
            >
              <BiUpvote
                className={`text-xl ${
                  localUserVote?.voteType === "upvote" ? "text-orange-500" : ""
                }`}
              />
            </button>
            <p>{vote}</p>
            <button
              disabled={
                localUserVote?.voteType === "downvote" ||
                userData?.reputation < 50 ||
                !user
              }
              onClick={() =>
                handleVote({
                  email: `${user?.email}`,
                  voteType: "downvote",
                })
              }
            >
              <BiDownvote
                className={`text-xl ${
                  localUserVote?.voteType === "downvote"
                    ? "text-orange-500"
                    : ""
                }`}
              />
            </button>
          </span>
          <span>👁️ {post?.views || 0} Views</span>
          <span>💬 {post?.comments?.length || 0} Comments</span>
          <span className="text-blue-400 font-medium">
            <Link to={`/postD/${post._id}`}>View More</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
