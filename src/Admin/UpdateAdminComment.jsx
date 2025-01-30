
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const UpdateAdminComment = () => {
  const { commentId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [commentData, setCommentData] = useState({ content: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
 
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/comments/single/${commentId}`);
        const data = await response.json();
        setCommentData(data);
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };
    fetchComment();
  }, [commentId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentData.content }),
      });

      if (response.ok) {
        navigate("/admin-profile");
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/admin-profile");
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate} className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
        <label htmlFor="comment" className="block text-gray-700 font-semibold mb-2">
          Type a comment: <span className="text-red-500">*</span>
        </label>
        <textarea
          id="comment"
          required
          className="w-full h-24 bg-gray-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
          placeholder="Write your comment here..."
          value={commentData.content}
          onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
        ></textarea>

        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
          Username: <span className="text-red-500">*</span>
        </label>
        <input
          placeholder={user?.displayName}
          className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 focus:outline-none cursor-not-allowed mb-4 block"
          disabled
        />

        <div className="flex justify-between gap-4">
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all">
            Update
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all"
          >
            Delete
          </button>
        </div>
      </form>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this comment?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAdminComment;

