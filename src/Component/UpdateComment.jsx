import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const UpdateComment = () => {
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {};

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
            className="w-full h-24 bg-red-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4"
            placeholder="Write your comment here..."
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

          <div className="flex ">
            <button
              type="submit"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md border border-gray-300 transition-all"
            >
              Update Comment
            </button>
            <button
              type="submit"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md border border-gray-300 transition-all"
            >
              Delete Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateComment;
