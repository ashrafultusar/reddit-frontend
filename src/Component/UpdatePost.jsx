import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    communityName: "",
    title: "",
    existingLinkFlair: "",
    addLinkFlair: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
        setPostData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error.message);
        toast.error("Failed to load post data!");
      }
    };
    fetchPost();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle post update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/api/posts/${id}`, postData);
      toast.success("Post updated successfully!");
      navigate("/user-profile");
    } catch (error) {
      console.error("Error updating post:", error.message);
      toast.error("Failed to update post!");
    }
  };

  // Handle post deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`);
      toast.success("Post deleted successfully!");
      setShowModal(false);
      navigate("/user-profile");
    } catch (error) {
      console.error("Error deleting post:", error.message);
      toast.error("Failed to delete post!");
    }
  };

  if (loading) {
    return <div>Loading post data...</div>;
  }

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Community Name</label>
          <input
            type="text"
            name="communityName"
            value={postData.communityName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Existing Link Flair</label>
          <input
            type="text"
            name="existingLinkFlair"
            value={postData.existingLinkFlair}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Additional Link Flair</label>
          <input
            type="text"
            name="addLinkFlair"
            value={postData.addLinkFlair}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Content</label>
          <textarea
            name="content"
            value={postData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Post
          </button>
        </div>
      </form>
 
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-4">This action will permanently delete the post.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
