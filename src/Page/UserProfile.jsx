import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ElapsedTime } from "../Component/PostDetails";

const UserProfile = () => {
    const { user } = useContext(AuthContext); // Firebase authenticated user
    const [activeTab, setActiveTab] = useState("posts");
    const [userPosts, setUserPosts] = useState([]);
    const [userCommunities, setUserCommunities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);

                // Fetch posts
                const postsResponse = await fetch("http://localhost:8000/api/posts");
                const postsData = await postsResponse.json();
                const filteredPosts = postsData.filter((post) => post.email === user?.email);

                // Fetch communities
                const communitiesResponse = await fetch("http://localhost:8000/api/communities");
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
                <h1 className="text-2xl font-bold">NAME: 
                     <span className="ml-2 uppercase">{user?.displayName || "No Name"}</span></h1>
                <p className="font-bold mt-3">Email: <span className="font-medium ml-1 ">{user?.email}</span></p>
                <p>Member Since: <span>{user?.metadata?.creationTime && (
                    <ElapsedTime timestamp={user?.metadata?.creationTime} />
                  )} </span></p>
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
            </div>

            {/* Listings */}
            <div>
                {activeTab === "posts" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Posts</h2>
                        {userPosts.length > 0 ? (
                            userPosts.map((post) => (
                                <div key={post.id} className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
                                    <h3 className="font-bold">{post.title}</h3>
                                    <p>{post.content}</p>
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
                                <div key={community.id} className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
                                    <h3 className="font-bold">{community.name}</h3>
                                </div>
                            ))
                        ) : (
                            <p>No communities found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
