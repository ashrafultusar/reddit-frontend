import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../Provider/AuthProvider";
import { ElapsedTime } from "../Component/PostDetails";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("users");

  // all user load
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/auth/users")
      .then((response) => response.json())
      .then((data) => setAllUser(data));
  }, []);

  // all community load
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/communities")
      .then((response) => response.json())
      .then((data) => setCommunities(data));
  }, []);

  console.log(communities);

  // Dummy data
  const adminInfo = {
    displayName: "Admin John Doe",
    email: "admin@example.com",
    memberSince: "January 1, 2020",
    reputation: 999,
  };

  const posts = [
    { id: 1, title: "Understanding React" },
    { id: 2, title: "Introduction to JavaScript" },
  ];

  const comments = [
    { id: 1, postTitle: "React Basics", comment: "React is amazing..." },
    { id: 2, postTitle: "JS Tips", comment: "Always use let and const..." },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Admin Info */}
      <div className="mb-6 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold">
          NAME:{" "}
          <span className="font-medium uppercase">{user?.displayName}</span>{" "}
        </h1>
        <p>Email: {user?.email}</p>
        <p>
          Member Since:
          {user?.metadata?.creationTime && (
            <ElapsedTime timestamp={user?.metadata?.creationTime} />
          )}
        </p>
        <p>Reputation: 990 points</p>
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === "users" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
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
            activeTab === "posts" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
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
        {activeTab === "users" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Phreddit Users</h2>
            {allUser.map((user) => (
              <Link>
                {" "}
                <div
                  key={user._id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm border"
                >
                  <h3 className="font-bold">{user.displayName}</h3>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Reputation: 100 points</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {activeTab === "communities" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Communities</h2>
            {communities.map((community) => (
              <Link>
                {" "}
                <div
                  key={community.id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm border "
                >
                  <h3 className="font-bold"> {community.communityName}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
        {activeTab === "posts" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
              >
                <h3 className="font-bold">{post.title}</h3>
                <button className="text-blue-500 mr-4">Edit</button>
                <button className="text-red-500">Delete</button>
              </div>
            ))}
          </div>
        )}
        {activeTab === "comments" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
              >
                <h3 className="font-bold">{comment.postTitle}</h3>
                <p className="text-gray-700">{comment.comment}</p>
                <button className="text-blue-500 mr-4">Edit</button>
                <button className="text-red-500">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
