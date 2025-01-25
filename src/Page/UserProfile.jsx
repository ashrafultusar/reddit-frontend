import React, { useContext, useState } from 'react';
import useAllUser from '../Hook/useAllUser';
import { AuthContext } from '../Provider/AuthProvider';

const UserProfile = () => {
    const {user}=useContext(AuthContext)
    const { users } = useAllUser();
    const [activeTab, setActiveTab] = useState("posts");

    // Dummy data
    const userInfo = {
        displayName: "John Doe",
        email: "johndoe@example.com",
        memberSince: "January 1, 2021",
        reputation: 245,
    };

    const communities = [
        { id: 1, name: "React Devs" },
        { id: 2, name: "JavaScript Enthusiasts" },
    ];

    const posts = [
        { id: 1, title: "Understanding React Lifecycle" },
        { id: 2, title: "JavaScript ES6 Features" },
    ];

    const comments = [
        { id: 1, postTitle: "React vs Angular", comment: "React is faster..." },
        { id: 2, postTitle: "Best Practices in JS", comment: "Always use const..." },
    ];

    const currentUser = users.find((dbUser) => dbUser.email === user?.email);
    const userRole = currentUser?.role; 






    return (
        <div className="p-4 max-w-6xl mx-auto">
            {/* User Information */}
            <div className="mb-6 bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold">{userInfo.displayName}</h1>
                <p>Email: {userInfo.email}</p>
                <p>Member Since: {userInfo.memberSince}</p>
                <p>Reputation: {userInfo.reputation} points</p>
            </div>

            {/* Tabs */}
            <div className="mb-4 border-b">
                <button
                    className={`px-4 py-2 ${activeTab === "posts" ? "border-b-2 border-blue-500 font-bold" : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    Posts
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === "communities" ? "border-b-2 border-blue-500 font-bold" : ""}`}
                    onClick={() => setActiveTab("communities")}
                >
                    Communities
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
                {activeTab === "posts" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Posts</h2>
                        {posts.map((post) => (
                            <div key={post.id} className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
                                <h3 className="font-bold">{post.title}</h3>
                                <button className="text-blue-500 mr-4">Edit</button>
                                <button className="text-red-500">Delete</button>
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
                                <button className="text-red-500">Delete</button>
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
                                <button className="text-red-500">Delete</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
