import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const CommentPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [parentCommentId, setCommentId] = useState(null);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = user.displayName;
    const email=user?.email

    const commentDetails = {
      postId: id,
      commenter: username,
      content: comment,
      parentComment: parentCommentId,email
    };

    axios
      .post(`http://localhost:8000/api/comments`, commentDetails)
      .then(() => {
      
        toast.success("comment success");
        navigate(`/postD/${id}`);
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
      });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setCommentId(queryParams.get("parentComment"));
  }, [location]);

  

  return (
    <div>
      <div className="p-6 font-sans">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg"
        >
          {/* Comment Field */}
          <label
            htmlFor="comment"
            className="block text-gray-700 font-semibold mb-2"
          >
            Type a comment: <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-24 bg-red-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4"
            placeholder="Write your comment here..."
            required
          ></textarea>

          {/* Username Field */}
          <label
            htmlFor="username"
            className="block text-gray-700 font-semibold mb-2"
          >
            Username: <span className="text-red-500">*</span>
          </label>
          <input
            placeholder={user?.displayName}
            className="w-full bg-red-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4 block cursor-not-allowed"
            disabled
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md border border-gray-300 transition-all"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentPage;
