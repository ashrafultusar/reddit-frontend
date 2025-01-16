import { Link, Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Main = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r-2 p-4">
          <h1 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Menu</h1>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                Home
              </Link>
            </li>
            <li>
              <h1 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mt-4">
                Communities
              </h1>
            </li>
            <li>
              <Link
                to="/create-community"
                className="block px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                Create Community
              </Link>
            </li>
          </ul>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
