import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ElapsedTime } from "../Component/PostDetails";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { user } = useContext(AuthContext); // Firebase authenticated user
  const [activeTab, setActiveTab] = useState("posts");
  const [userPosts, setUserPosts] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);

  // Function to open the delete modal
  const openModal = (communityId) => {
    setSelectedCommunityId(communityId);
    setIsModalOpen(true);
  };

  // Function to close the delete modal
  const closeModal = () => {
    setSelectedCommunityId(null);
    setIsModalOpen(false);
  };

  // Function to handle community deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/communities/id/${selectedCommunityId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        toast.success("Community deleted successfully!");
        // Update the local state
        setUserCommunities((prev) =>
          prev.filter((community) => community._id !== selectedCommunityId)
        );
        closeModal();
      } else {
        toast.error("Failed to delete community.");
      }
    } catch (error) {
      console.error("Error deleting community:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch posts
        const postsResponse = await fetch("http://localhost:8000/api/posts");
        const postsData = await postsResponse.json();
        const filteredPosts = postsData.filter(
          (post) => post.email === user?.email
        );

        // Fetch communities
        const communitiesResponse = await fetch(
          "http://localhost:8000/api/communities"
        );
        const communitiesData = await communitiesResponse.json();
        const filteredCommunities = communitiesData.filter(
          (community) => community.email === user?.email
        );

        // Update state
        setUserPosts(filteredPosts);
        setUserCommunities(filteredCommunities);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* User Information */}
      <div className="mb-6 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold">
          NAME:
          <span className="ml-2 uppercase">
            {user?.displayName || "No Name"}
          </span>
        </h1>
        <p className="font-bold mt-3">
          Email: <span className="font-medium ml-1 ">{user?.email}</span>
        </p>
        <p>
          Member Since:{" "}
          <span>
            {user?.metadata?.creationTime && (
              <ElapsedTime timestamp={user?.metadata?.creationTime} />
            )}{" "}
          </span>
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === "posts" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "communities"
              ? "border-b-2 border-blue-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab("communities")}
        >
          Communities
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "comments"
              ? "border-b-2 border-blue-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
      </div>

      {/* Listings */}
      <div>
        {activeTab === "posts" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
                >
                  <h3 className="font-bold">{post.title}</h3>
                  <p>{post.content}</p>

                  <div className="flex  gap-4 pt-6">
                    <Link
                      to={`/update-post/${post._id}`}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => openModal(community._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </div>
        )}
        {activeTab === "communities" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Communities</h2>
            {userCommunities.length > 0 ? (
              userCommunities.map((community) => (
                <div
                  key={community._id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
                >
                  <p className="font-bold">
                    Name:{" "}
                    <span className="mr-2">{community?.communityName}</span>
                  </p>
                  <div className="flex  gap-4 pt-6">
                    <Link
                      to={`/updateCommunity/${community._id}`}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => openModal(community._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No communities found.</p>
            )}
          </div>
        )}
        {activeTab === "comments" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {userComments.length > 0 ? (
              userComments.map((comments) => (
                <div
                  key={comments.id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
                >
                  <h3 className="font-bold">{comments.name}</h3>
                </div>
              ))
            ) : (
              <p>No comments found.</p>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserProfile;
