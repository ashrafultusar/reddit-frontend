import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateComment = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [commentData, setCommentData] = useState({ content: "" });

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/comments/single/${id}`
        );
        setCommentData(response.data);
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };

    fetchComment();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/comments/${id}`, commentData);
      toast.success("Comment updated successfully!");
      navigate("/user-profile");
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Failed to update the comment.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${id}`);
      toast.success("Comment deleted successfully!");
      navigate("/user-profile"); 
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete the comment.");
    }
  };

  return (
    <div className="p-6 font-sans">
      <form
        onSubmit={handleUpdate}
        className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg"
      >
        <label
          htmlFor="comment"
          className="block text-gray-700 font-semibold mb-2"
        >
          Type a comment: <span className="text-red-500">*</span>
        </label>
        <textarea
          id="comment"
          required
          defaultValue={commentData?.content}
          className="w-full h-24 bg-red-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4"
          placeholder="Write your comment here..."
          value={commentData.content}
          onChange={(e) =>
            setCommentData({ ...commentData, content: e.target.value })
          }
        ></textarea>

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

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all"
          >
            Update Comment
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all"
          >
            Delete Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateComment;
