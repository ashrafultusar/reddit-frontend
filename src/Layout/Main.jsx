// import { NavLink, Outlet } from "react-router-dom";
// import Navbar from "../Shared/Navbar";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import ViewCommunity from "./../Component/ViewCommunity";

// const Main = () => {

//   const isDarkMode = true;

//   // community load
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/api/communities").then((response) => {
//       setData(response.data);
//     });
//   }, []);

//   return (
//     <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
//       {/* Navbar */}
//       <div className="sticky top-0 z-10">
//         <Navbar />
//       </div>

//       {/* Main Content Area */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r-2 p-4 hidden md:block">
//           <h1 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
//             Menu
//           </h1>
//           <ul className="space-y-4">
//             <li>
//               <NavLink
//                 to="/"
//                 end
//                 className={({ isActive }) =>
//                   `text-center block px-4 py-2 rounded text-gray-700 dark:text-gray-200 ${
//                     isActive
//                       ? "bg-[#ff4500] text-white"
//                       : "bg-gray-300 dark:bg-gray-600 hover:bg-[#ff4500]"
//                   }`
//                 }
//               >
//                 Home
//               </NavLink>
//             </li>

//             <li>
//               <h1 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mt-4">
//                 Communities
//               </h1>
//             </li>

//             <li>
//               <NavLink
//                 to="/create-community"
//                 className={({ isActive }) =>
//                   `block px-4 py-2 text-center rounded text-gray-700 dark:text-gray-200 ${
//                     isActive
//                       ? "bg-[#ff4500] text-white"
//                       : "bg-gray-300 dark:bg-gray-600 hover:bg-[#ff4500]"
//                   }`
//                 }
//               >
//                 Create Community
//               </NavLink>
//             </li>
           
//             {/* Rendering current communities using NavLink */}
//             {data.map((community) => (
//               <li key={community._id}>
//                 <NavLink to={`/community/${community.communityName}`} className="flex items-center justify-center bg-gray-200 rounded-md">
//                   {community?.communityName}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Dynamic Content Area */}
//         <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;

import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const isDarkMode = true; // Toggle dark mode if needed

  // State to hold community data
  const [data, setData] = useState([]);

  // Fetch communities when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/communities")
      .then((response) => {
        setData(response.data); // Update state with community data
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
      });
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Navbar */}
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {/* Sidebar */}
<div
  className="w-64 bg-gray-100 dark:bg-gray-800 border-r-2 p-4 hidden md:block overflow-y-auto h-full"
>
  <h1 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
    Menu
  </h1>
  <ul className="space-y-4">
    {/* Other menu items */}
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

    {/* Communities Section */}
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

    {/* Rendering Current Communities */}
    {data.length > 0 ? (
      data.map((community) => (
        <li key={community._id}>
          <NavLink
            to={`/community/${community.communityName}`}
            className={({ isActive }) =>
              `block border py-1 text-center rounded text-gray-700 dark:text-gray-200 ${
                isActive ? "bg-[#9f9f9f] text-white" : ""
              }`
            }
          >
            {community.communityName}
          </NavLink>
        </li>
      ))
    ) : (
      <li className="text-center text-red-500">No Communities Found</li>
    )}
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
