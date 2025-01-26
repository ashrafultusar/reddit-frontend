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
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteType, setDeleteType] = useState(""); // 'post' or 'community'

  // Open the delete modal
  const openModal = (id, type) => {
    setSelectedItemId(id);
    setDeleteType(type);
    setIsModalOpen(true);
  };

  // Close the delete modal
  const closeModal = () => {
    setSelectedItemId(null);
    setDeleteType("");
    setIsModalOpen(false);
  };

  // Handle post deletion
  const handleDeletePost = async () => {
    const url = `http://localhost:8000/api/posts/${selectedItemId}`;

    try {
      const response = await fetch(url, { method: "DELETE" });

      if (response.ok) {
        toast.success("Post deleted successfully!");
        setUserPosts((prev) => prev.filter((post) => post._id !== selectedItemId));
        closeModal();
      } else {
        toast.error("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Something went wrong!");
    }
  };

  // Handle community deletion
  const handleDeleteCommunity = async () => {
    const url = `http://localhost:8000/api/communities/id/${selectedItemId}`;

    try {
      const response = await fetch(url, { method: "DELETE" });

      if (response.ok) {
        toast.success("Community deleted successfully!");
        setUserCommunities((prev) => prev.filter((community) => community._id !== selectedItemId));
        closeModal();
      } else {
        toast.error("Failed to delete community.");
      }
    } catch (error) {
      console.error("Error deleting community:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const [postsResponse, communitiesResponse] = await Promise.all([
          fetch("http://localhost:8000/api/posts"),
          fetch("http://localhost:8000/api/communities"),
        ]);

        const [postsData, communitiesData] = await Promise.all([
          postsResponse.json(),
          communitiesResponse.json(),
        ]);

        setUserPosts(postsData.filter((post) => post.email === user?.email));
        setUserCommunities(
          communitiesData.filter((community) => community.email === user?.email)
        );
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
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
        {["posts", "communities", "comments"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 font-bold"
                : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "posts" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
                >
                  <h3 className="font-bold">{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="flex gap-4 pt-6">
                    <Link
                      to={`/update-post/${post._id}`}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => openModal(post._id, "post")}
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
                    Name: <span>{community.communityName}</span>
                  </p>
                  <div className="flex gap-4 pt-6">
                    <Link
                      to={`/updateCommunity/${community._id}`}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => openModal(community._id, "community")}
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
            <p>No comments found.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={
          deleteType === "post" ? handleDeletePost : handleDeleteCommunity
        }
      />
    </div>
  );
};

export default UserProfile;
