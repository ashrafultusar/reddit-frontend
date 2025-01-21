import React, { useState } from 'react';

const AdminProfile = () => {
    const [activeTab, setActiveTab] = useState("users");

    // Dummy data
    const adminInfo = {
        displayName: "Admin John Doe",
        email: "admin@example.com",
        memberSince: "January 1, 2020",
        reputation: 999,
    };

    const users = [
        { id: 1, displayName: "User One", email: "userone@example.com", reputation: 100 },
        { id: 2, displayName: "User Two", email: "usertwo@example.com", reputation: 200 },
    ];

    const communities = [
        { id: 1, name: "React Developers" },
        { id: 2, name: "Web Enthusiasts" },
    ];

    const posts = [
        { id: 1, title: "Understanding React" },
        { id: 2, title: "Introduction to JavaScript" },
    ];

    const comments = [
        { id: 1, postTitle: "React Basics", comment: "React is amazing..." },
        { id: 2, postTitle: "JS Tips", comment: "Always use let and const..." },
    ];

    const handleDelete = (type, id) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            alert(`${type} with ID ${id} has been deleted.`);
        }
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            {/* Admin Info */}
            <div className="mb-6 bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold">{adminInfo.displayName}</h1>
                <p>Email: {adminInfo.email}</p>
                <p>Member Since: {adminInfo.memberSince}</p>
                <p>Reputation: {adminInfo.reputation} points</p>
            </div>

            {/* Tabs */}
            <div className="mb-4 border-b">
                <button
                    className={`px-4 py-2 ${activeTab === "users" ? "border-b-2 border-blue-500 font-bold" : ""}`}
                    onClick={() => setActiveTab("users")}
                >
                    Users
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === "communities" ? "border-b-2 border-blue-500 font-bold" : ""}`}
                    onClick={() => setActiveTab("communities")}
                >
                    Communities
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === "posts" ? "border-b-2 border-blue-500 font-bold" : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    Posts
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === "comments" ? "border-b-2 border-blue-500 font-bold" : ""}`}
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
                        {users.map((user) => (
                            <div key={user.id} className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
                                <h3 className="font-bold">{user.displayName}</h3>
                                <p>Email: {user.email}</p>
                                <p>Reputation: {user.reputation} points</p>
                                <button
                                    className="text-blue-500 mr-4"
                                    onClick={() => alert(`Navigating to ${user.displayName}'s profile`)}
                                >
                                    View Profile
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete("user", user.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "communities" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Communities</h2>
                        {communities.map((community) => (
                            <div key={community.id} className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
                                <h3 className="font-bold">{community.name}</h3>
                                <button className="text-blue-500 mr-4">Edit</button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete("community", community.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "posts" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Posts</h2>
                        {posts.map((post) => (
                            <div key={post.id} className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
                                <h3 className="font-bold">{post.title}</h3>
                                <button className="text-blue-500 mr-4">Edit</button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete("post", post.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "comments" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Comments</h2>
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
                                <h3 className="font-bold">{comment.postTitle}</h3>
                                <p className="text-gray-700">{comment.comment}</p>
                                <button className="text-blue-500 mr-4">Edit</button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete("comment", comment.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
