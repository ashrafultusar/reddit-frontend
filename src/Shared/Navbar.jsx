import { useContext } from "react";
import logo from "../assets/logo.png";
import { ApplicationContext } from "../contexts/ApplicationSharedContext";
import { Link, NavLink } from "react-router-dom";
import { toast } from 'react-toastify';

const Navbar = () => {
  const { showMobileNav, setShowMobileNav } = useContext(ApplicationContext);
  return (
    <div className="">
      {/* Navbar */}
      <div className="navbar bg-base-100 border-b-2">
        <div className="navbar-start">
          {/* Menu button for smaller devices */}
          <button
            // onClick={() => setShowMobileNav(!showMobileNav)}
            className="btn btn-ghost btn-circle lg:hidden"
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
          <Link to={"/"}>
            <div className="flex items-center">
              <img className="w-16 cursor-pointer" src={logo} alt="logo" />

              <span className="hidden lg:block text-red-500 font-bold text-3xl">
                phreddit
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-center">
          <input
            type="text"
            value=""
            placeholder="Search Phreddit…"
            className="w-full px-16 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="navbar-end flex items-center space-x-2">
          <div className="flex gap-1">
            <Link to={'/user-profile'}>
              {" "}
              <img
                className="w-10 rounded-full"
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </Link>
            <Link to={'/admin-profile'}>
              {" "}
              <img
                className="w-10 rounded-full"
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />{" "}
            </Link>
          </div>

          <NavLink to={"/create-post"}>
            <button className="btn btn-sm bg-gray-200 hover:bg-[#ff4500] active:bg-[#ff4500] focus:bg-[#ff4500] text-gray-800 rounded-full px-4 hover:text-white">
              Create Post
            </button>
          </NavLink>
          <Link to={"/login"}>
            <button className="btn btn-sm bg-red-500 text-white rounded-full px-4 hover:bg-red-600">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
