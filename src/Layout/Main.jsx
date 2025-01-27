import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const Main = () => {
  const isDarkMode = true; 
  const { user, relode } = useContext(AuthContext); 
  const navigate = useNavigate(); 

 
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/communities")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
          const userJoinedA = user?.joinedCommunities?.includes(a._id);
          const userJoinedB = user?.joinedCommunities?.includes(b._id);
          return userJoinedA === userJoinedB ? 0 : userJoinedA ? -1 : 1;
        });
        setData(sortedData); 
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
        setError("Failed to load communities. Please try again later.");
      });
  }, [user, relode]);

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Navbar */}
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r-2 p-4 hidden md:block overflow-y-auto h-full">
          <h1 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
            Menu
          </h1>
          <ul className="space-y-4">
            {/* Home Link */}
            <li>
              <NavLink
                to={user ? "/" : "/login"} 
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault(); 
                    navigate("/login", { state: { from: "/" } }); 
                  }
                }}
                end
                className={({ isActive }) =>
                  `text-center block px-4 py-2 rounded text-gray-700 dark:text-gray-200 ${
                    isActive
                      ? "bg-[#ff4500] text-white"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-[#ff4500]"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            {/* Communities Section */}
            <li>
              <h1 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mt-4">
                Communities
              </h1>
            </li>

            {/* Create Community Button */}
            <li>
              {user ? (
                <NavLink
                  to="/create-community"
                  className={({ isActive }) =>
                    `block px-4 py-2 text-center rounded text-gray-700 dark:text-gray-200 ${
                      isActive
                        ? "bg-[#ff4500] text-white"
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-[#ff4500]"
                    }`
                  }
                >
                  Create Community
                </NavLink>
              ) : (
                <button
                  className="block px-4 py-2 text-center rounded bg-gray-300 dark:bg-gray-600 w-full text-gray-500 cursor-not-allowed"
                  disabled
                >
                  Create Community
                </button>
              )}
            </li>

            {/* Rendering Current Communities */}
            {error ? (
              <li className="text-center text-red-500">{error}</li>
            ) : data && data.length > 0 ? (
              data.map((community) => (
                <li key={community._id}>
                  <NavLink
                    to={`/community/${community.communityName}`}
                    className="flex items-center justify-center bg-gray-200 rounded-md"
                  >
                    {community?.communityName}
                  </NavLink>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500">
                No Communities Found
              </li>
            )}
          </ul>

          {/* Back to Welcome Page Button */}
          {error && (
            <button
              onClick={() => navigate("/")}
              className="mt-4 block w-full text-center px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Back to Welcome Page
            </button>
          )}
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
