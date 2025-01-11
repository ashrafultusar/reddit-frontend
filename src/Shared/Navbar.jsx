import React, { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          {/* Menu button for smaller devices */}
          <button
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <div className="flex items-center">
            <img className="w-16" src={logo} alt="logo" />
            <span className="hidden lg:block text-red-500 font-bold text-3xl">
              reddit
            </span>
          </div>
        </div>
        <div className="navbar-center">
        <input
        type="text"
        value=''
      
        placeholder="Search Reddit"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
        </div>
        <div className="navbar-end flex items-center space-x-2">
          <button className="btn btn-sm bg-gray-200 text-gray-800 rounded-full px-4 hover:bg-gray-300">
            Get App
          </button>
          <button className="btn btn-sm bg-red-500 text-white rounded-full px-4 hover:bg-red-600">
            Log In
          </button>
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-200 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:relative lg:w-64`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#home"
                className="block py-2 px-4 rounded hover:bg-base-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="block py-2 px-4 rounded hover:bg-base-300"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block py-2 px-4 rounded hover:bg-base-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 px-4 rounded hover:bg-base-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
