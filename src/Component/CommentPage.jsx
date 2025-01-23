import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CommentPage = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment:", comment);
    console.log("Username:", username);
    // Add further form submission logic here
  };
  console.log(id);

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
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-red-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4"
            placeholder="Enter your username..."
            required
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
