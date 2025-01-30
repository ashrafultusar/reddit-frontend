import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../Provider/AuthProvider";
import { ElapsedTime } from "../Component/PostDetails";
import { Link, useNavigate } from "react-router-dom";

const UserInfo = () => {
  const { user, userData } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("users");
 


  // all user load
  useEffect(() => {
    fetch("http://localhost:8000/api/auth/users")
      .then((response) => response.json())
      .then((data) => setAllUser(data));
  }, []);

  

  

  

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Admin Info */}
      <div className="mb-6 bg-white shadow-lg rounded-lg p-6 text-center">
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

        <p>Reputation: {userData?.reputation}</p>
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
            {/* {allUser.map((user) => (
              <Link>
                {" "}
                <div
                  key={user._id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm border"
                >
                  <h3 className="font-bold">{user.displayName}</h3>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Reputation: {user?.reputation}</p>
                </div>
              </Link>
            ))} */}
          </div>
        )}
        {activeTab === "communities" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Communities</h2>
            {/* {communities.map((community) => (
              <Link to={`/updateAdminCommunity/${community._id}`}>
                {" "}
                <div
                  key={community.id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm border "
                >
                  <h3 className="font-bold">
                    {community?.communityName?.length > 20
                      ? community?.communityName?.substring(0, 20) + "..."
                      : community?.communityName}
                  </h3>
                </div>
              </Link>
            ))} */}
          </div>
        )}
        {activeTab === "posts" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            {/* {posts.map((post) => (
              <Link to={`/adminUpdatePost/${post._id}`}>
                <div
                  key={post.id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
                >
                  <h3 className="font-bold">
                    {post?.title?.length > 20
                      ? post?.title?.substring(0, 20) + "..."
                      : post?.title}
                  </h3>
                </div>
              </Link>
            ))} */}
          </div>
        )}
        {activeTab === "comments" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {/* {comments.map((comment) => (
              <Link to={`/updateAdminComment/${comment._id}`} key={comment._id}>
                {" "}
                <div
                  key={comment.id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
                >
                  <p className="text-gray-700">
                    {comment?.content?.length > 20
                      ? comment?.content?.substring(0, 20) + "..."
                      : comment?.content}
                  </p>
                </div>
              </Link>
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
