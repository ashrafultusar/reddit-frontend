import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CommunitiesManage = () => {
  const { communityMId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    communityName: "",
    description: "",
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch Community Data
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/communities/id/${communityMId}`);
        if (!response.ok) throw new Error("Failed to fetch community data");
        
        const data = await response.json();
        setFormData({
          communityName: data.communityName,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching community:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [communityMId]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Community Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/communities/id/${communityMId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
          toast.success("Community updated successfully!");
          navigate('/admin-profile')
      } else {
        toast.error("Failed to update community.");
      }
    } catch (error) {
      console.error("Error updating community:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Community Deletion
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/communities/id/${communityMId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Community deleted successfully!");
        navigate("/"); // Redirect after deletion
      } else {
        toast.success("Failed to delete community.");
      }
    } catch (error) {
      console.error("Error deleting community:", error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="mt-16">
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 text-center">
          {loading ? "Loading..." : "Update Community"}
        </h2>

        {!loading && (
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label className="text-gray-700" htmlFor="communityName">
                  Community Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="communityName"
                  name="communityName"
                  type="text"
                  value={formData.communityName}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="description">
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 border rounded-md"
                  placeholder="Write about your community..."
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="px-8 py-2.5 bg-green-500 hover:bg-green-600 rounded-md text-white"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-8 py-2.5 bg-red-500 hover:bg-red-600 rounded-md text-white"
              >
                Delete
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-semibold">Are you sure?</h3>
            <p>This action cannot be undone.</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 bg-gray-300 rounded"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitiesManage;
