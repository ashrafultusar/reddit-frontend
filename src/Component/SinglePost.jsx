import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import axios from "axios";
import { Link } from "react-router-dom";
import { ElapsedTime } from "./Post";
import { useEffect, useState } from "react";

const SinglePost = ({ post}) => {
  const [vote, setVote] = useState(post?.vote || 0);
  const handleVote = (data) => {
    if (data?.voteChange > 0) {
      setVote(vote + 1);
    }
    if (data?.voteChange < 0) {
      if (vote === 0) {
        return setVote(0);
      }
      setVote(vote - 1);
    }
    axios
      .patch("http://localhost:8000/api/posts/votes", data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const [comments, setComments] = useState({});
  useEffect(() => {
    axios(`http://localhost:8000/api/comments/${post?._id}`)
      .then((res) => setComments(res?.data))
      .catch((err) => console.error(err));
  });
  // console.log(comments);

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
        <p className="text-sm text-gray-600 mt-2">
          {/* Post Content */}
          <p className="text-gray-700 mt-4">
            {post?.content?.length > 80
              ? `${post.content.substring(0, 80)}...`
              : post?.content || "No content available"}
          </p>
        </p>
        <div className="mt-4 flex items-center justify-around text-sm text-gray-500">
          <span className="flex items-center justify-center gap-1 border p-1 rounded-full">
            <button>
              <BiUpvote
                onClick={() =>
                  handleVote({
                    postId: `${post?._id}`,
                    voteChange: 1,
                  })
                }
                className="text-xl"
              />
            </button>
            <p>{vote}</p>
            <button>
              <BiDownvote
                onClick={() =>
                  handleVote({
                    postId: `${post?._id}`,
                    voteChange: -1,
                  })
                }
                className="text-xl"
              />
            </button>
          </span>
          <span>👁️ {post?.views || 0} Views</span>
          <span>💬 {comments?.totalCommentCount || 0} Comments</span>
          <span className="text-blue-400 font-medium">
            <Link to={`/postD/${post._id}`}>View More</Link>
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SinglePost;
