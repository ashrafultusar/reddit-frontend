import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserInfo = () => {
  const { email } = useParams(); // Extract the email from the URL
  const [activeTab, setActiveTab] = useState("communities");
  const [user, setUser] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);

  // Fetch user data
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/auth/user/${email}`
        );
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, [email]);

  // Fetch all communities
  useEffect(() => {
    fetch("http://localhost:8000/api/communities")
      .then((response) => response.json())
      .then((data) => setCommunities(data));
  }, []);

  // Fetch all comments
  useEffect(() => {
    fetch("http://localhost:8000/api/comments/all")
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  // Fetch all posts
  useEffect(() => {
    fetch("http://localhost:8000/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  // Filter communities, posts, and comments based on user's email
  useEffect(() => {
    if (user) {
      // Filter communities
      const filteredCommunities = communities.filter(
        (community) => community.email === user.email
      );
      setFilteredCommunities(filteredCommunities);

      // Filter posts
      const filteredPosts = posts.filter((post) => post.email === user.email);
      setFilteredPosts(filteredPosts);

      // Filter comments
      const filteredComments = comments.filter(
        (comment) => comment.email === user.email
      );
      setFilteredComments(filteredComments);
    }
  }, [user, communities, posts, comments]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* User Info */}
      <div className="mb-6 bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold">
          NAME: <span className="font-medium uppercase">{user.name}</span>
        </h1>
        <p>Email: {user.email}</p>
        <p>Reputation: {user.reputation}</p>
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b">
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
        {activeTab === "communities" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Communities</h2>
            {filteredCommunities.length > 0 ? (
              filteredCommunities.map((community) => (
                <div
                  key={community._id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm border"
                >
                  <h3 className="font-bold">{community.communityName}</h3>
                
                </div>
              ))
            ) : (
              <p>No communities found for this user.</p>
            )}
          </div>
        )}

        {activeTab === "posts" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
                >
                  <h3 className="font-bold">
                    {post.title?.length > 20
                      ? post.title.substring(0, 20) + "..."
                      : post.title}
                  </h3>
                 
                </div>
              ))
            ) : (
              <p>No posts found for this user.</p>
            )}
          </div>
        )}

        {activeTab === "comments" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
                >
                  <p className="text-gray-700">
                    {comment.content?.length > 20
                      ? comment.content.substring(0, 20) + "..."
                      : comment.content}
                  </p>
                
                </div>
              ))
            ) : (
              <p>No comments found for this user.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;