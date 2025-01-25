import { useContext } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);

  const logOutHandler = () => {
    logOut()
      .then(() => toast.success("Logout Success"))
      .catch((err) => toast.error(`${err.message}`));
  };
  // console.log(user);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e.target.search.value);
  };
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
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              placeholder="Search Phreddit..."
              className="border-2 border-[#EF4444] text-[#EF4444] rounded-md w-full outline-none px-4 py-1"
            />
          </form>
        </div>

        <div className="navbar-end flex items-center space-x-2">
          {/* User Profile Button */}
          {user ? (
            <div className="flex gap-1">
              <Link to={"/user-profile"}>
                <img
                  className="w-10 rounded-full"
                  alt="User Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </Link>{" "}
              <span className="text-gray-700 font-semibold">
                {user?.displayName}
              </span>
            </div>
          ) : (
            <button
              className="btn btn-sm bg-gray-200 text-gray-500 rounded-full px-4 cursor-not-allowed"
              disabled
            >
              Guest
            </button>
          )}

          {/* Create Post Button */}
          {user ? (
            <NavLink to={"/create-post"}>
              <button className="btn btn-sm bg-gray-200 hover:bg-[#ff4500] active:bg-[#ff4500] focus:bg-[#ff4500] text-gray-800 rounded-full px-4 hover:text-white">
                Create Post
              </button>
            </NavLink>
          ) : (
            <button
              className="btn btn-sm bg-gray-200 text-gray-500 rounded-full px-4 cursor-not-allowed"
              disabled
            >
              Create Post
            </button>
          )}

          {/* Login/Logout Button */}
          {user ? (
            <button
              onClick={logOutHandler}
              className="btn btn-sm bg-red-500 text-white rounded-full px-4 hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="btn btn-sm bg-red-500 text-white rounded-full px-4 hover:bg-red-600">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
