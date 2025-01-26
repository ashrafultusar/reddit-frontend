import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

 
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
        setPostData(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error.message);
        alert("Failed to load post data!");
      }
    };
    fetchPost();
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/api/posts/${id}`, postData); 
      alert("Post updated successfully!");
      navigate("/user-profile"); 
    } catch (error) {
      console.error("Error updating post:", error.message);
      alert("Failed to update post!");
    }
  };

  if (loading) {
    return <div>Loading post data...</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Post</h2>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
