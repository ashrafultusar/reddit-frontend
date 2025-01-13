import { useContext } from "react";
import logo from "../assets/logo.png";
import { ApplicationContext } from "../contexts/ApplicationSharedContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {
    showMobileNav,
    setShowMobileNav} = useContext(ApplicationContext)
  return (
    <div className="">
      {/* Navbar */}
      <div className="navbar bg-base-100 border-b-2">
        <div className="navbar-start">
          {/* Menu button for smaller devices */}
          <button
            // onClick={() => setShowMobileNav(!showMobileNav)}
            className="btn btn-ghost btn-circle lg:hidden">
            
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
            value=""
            placeholder="Search Reddit"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="navbar-end flex items-center space-x-2">
          <button className="btn btn-sm bg-gray-200 text-gray-800 rounded-full px-4 hover:bg-gray-300">
            Get App
          </button>
          <Link to={'/login'}>
          <button className="btn btn-sm bg-red-500 text-white rounded-full px-4 hover:bg-red-600">
            Log In
          </button></Link>
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
    </div>
  );
};

export default Navbar;
