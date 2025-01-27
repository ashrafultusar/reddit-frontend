import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ElapsedTime } from "../Component/PostDetails";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal";
import { toast } from "react-toastify";
import axios from "axios";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("posts");
  const [userPosts, setUserPosts] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);

  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);

  const openModal = (communityId) => {
    setSelectedCommunityId(communityId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCommunityId(null);
    setIsModalOpen(false);
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

        // fetch comments
        const commentsResponse = await fetch(
          "http://localhost:8000/api/comments/all"
        );
        const commentsData = await commentsResponse.json();

        const filteredComments = commentsData.filter(
          (comment) => comment.email === user?.email
        );

        // Update state
        setUserPosts(filteredPosts);
        setUserCommunities(filteredCommunities);
        setUserComments(filteredComments)
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

  // // all comment fetch
  // const [comments, setComments] = useState();
  // useEffect(() => {
  //   axios(`http://localhost:8000/api/comments/all`)
  //     .then((res) => setComments(res?.data))
  //     .catch((err) => console.error(err));
  // }, []);
  console.log(userComments);

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
            )}
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
                <Link key={post._id} to={`/update-post/${post._id}`}>
                  <div className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm border flex flex-col">
                    <h3 className="font-bold">{post.title}</h3>
                    <p>{post.content}</p>
                  </div>
                </Link>
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
                <Link to={`/updateCommunity/${community._id}`}>
                  <div
                    key={community._id}
                    className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm border flex"
                  >
                    <p className="font-bold">
                      Name:{" "}
                      <span className="mr-2">{community?.communityName}</span>
                    </p>
                    <div className="flex gap-4 pt-6"></div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No communities found.</p>
            )}
          </div>
        )}
        {activeTab === "comments" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {userComments?.length > 0 ? (
              userComments?.map((comment) => (
                <Link to={`/updateComment/${comment._id}`}>
                  {" "}
                  <div
                    key={comment?._id}
                    className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
                  >
                    <h3 className="font-bold">
                      {comment?.content?.length > 20
                        ? comment?.content?.substring(0, 20) + "..."
                        : comment?.content}
                    </h3>
                  </div>
                </Link>
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
        onDelete={() => {}}
      />
    </div>
  );
};

export default UserProfile;
