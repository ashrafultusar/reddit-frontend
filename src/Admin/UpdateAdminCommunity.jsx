import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; 

const UpdateAdminCommunity = () => {
  const { user } = useContext(AuthContext);
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    communityName: "",
    description: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

  // Fetch community details
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/communities/id/${communityId}`);
        const data = await response.json();
        setCommunity(data);
        setFormData({
          communityName: data.communityName,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching community details:", error);
      }
    };

    fetchCommunity();
  }, [communityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/communities/id/${communityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Community updated successfully!");
        navigate("/admin-profile");
      } else {
        const data = await response.json();
        setErrors(data.errors || {});
      }
    } catch (error) {
      console.error("Error updating community:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/communities/id/${communityId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Community deleted successfully!");
        navigate("/admin-profile");
      }
    } catch (error) {
      console.error("Error deleting community:", error);
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  if (!community) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mt-16">
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center">
            Update Community
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="communityName"
                >
                  Community Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="communityName"
                  name="communityName"
                  type="text"
                  value={formData.communityName}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring ${
                    errors.communityName
                      ? "border-red-500"
                      : "focus:border-blue-400"
                  }`}
                />
                {errors.communityName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.communityName}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="username"
                >
                  Username <span className="text-red-600">*</span>
                </label>
                <input
                  id="username"
                  disabled
                  placeholder={user?.displayName}
                  type="text"
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring ${
                    errors.username ? "border-red-500" : "focus:border-blue-400"
                  }`}
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="description"
              >
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring ${
                  errors.description
                    ? "border-red-500"
                    : "focus:border-blue-400"
                }`}
                placeholder="Write about your community here..."
              ></textarea>
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="px-8 py-2.5 leading-5 bg-green-500 hover:bg-green-600 rounded-md text-white"
              >
                Update
              </button>
              <button
                type="button"
                onClick={openDeleteModal}
                className="px-8 py-2.5 leading-5 bg-[#FF4500] hover:bg-orange-700 rounded-md text-white"
              >
                Delete
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UpdateAdminCommunity;
