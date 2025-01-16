import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Main = () => {
  // Example: You can implement a dynamic dark mode toggle state here if needed
  const isDarkMode = true; // Replace with your state management logic

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Navbar */}
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r-2 p-4 hidden md:block">
          <h1 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
            Menu
          </h1>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/"
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

            <li>
              <h1 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mt-4">
                Communities
              </h1>
            </li>
            <li>
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
            </li>
          </ul>
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
