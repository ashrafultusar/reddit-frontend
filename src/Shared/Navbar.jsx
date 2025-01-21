import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { toast } from 'react-toastify';

const Navbar = () => {
  return (
    <div className="">
      {/* Navbar */}
      <div className="navbar bg-base-100 border-b-2">
        <div className="navbar-start">
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
