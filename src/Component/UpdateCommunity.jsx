import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCommunity = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/communities/id/${communityId}`
        );
        const data = await response.json();
        setCommunity(data);
      } catch (error) {
        console.error("Error fetching community:", error);
      }
    };

    fetchCommunity();
  }, [communityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/communities/id/${communityId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            communityName: community.communityName,
            description: community.description,
          }),
        }
      );

      if (response.ok) {
        toast.success("Community updated successfully!");
        navigate("/user-profile");
      } else {
        toast.error("Failed to update community.");
      }
    } catch (error) {
      console.error("Error updating community:", error);
    }
  };

  const handleChange = (e) => {
    setCommunity({
      ...community,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/communities/id/${communityId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Community deleted successfully!");
        navigate("/user-profile");
      } else {
        toast.error("Failed to delete community.");
      }
    } catch (error) {
      console.error("Error deleting community:", error);
    }
  };

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 text-center">
          Update Community
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label className="text-gray-700" htmlFor="communityName">
                Community Name
              </label>
              <input
                id="communityName"
                name="communityName"
                type="text"
                value={community.communityName || ""}
                onChange={handleChange}
                className="block w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={community.description || ""}
                onChange={handleChange}
                className="block w-full px-4 py-2 border rounded-md"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-between text-center">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-500 rounded-md"
            >
              Update Community
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 text-white bg-red-500 rounded-md"
            >
              Delete Community
            </button>
          </div>
        </form>
        <div className="mt-4  text-center"></div>
      </section>
    </div>
  );
};

export default UpdateCommunity;
