// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const LogIn = () => {
//   const navigate = useNavigate();

//   const handelLogin = async (e) => {
//     e.preventDefault();

//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;

//     const data = {
//       name: email,
//       password: password,
//     };

//     axios
//       .post("http://localhost:8000/login", data)
//       .then((res) => {
//         toast.success("Login successful!");
//         navigate("/");
//         form.reset();
//       })
//       .catch((err) => {
//         if (err.response && err.response.status === 400) {
//           toast.error(err.response.data.message || "Invalid login credentials!");
//         } else {
//           toast.error("An error occurred. Please try again later.");
//         }
//       });
//   };

//   return (
//     <div>
//       <div className="hero min-h-screen">
//         <div className="hero-content flex-col">
//           <div className="card bg-base-100 w-full max-w-7xl shrink-0 shadow-2xl">
//             <form className="card-body" onSubmit={handelLogin}>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               <div className="form-control mt-6">
//                 <button type="submit" className="btn btn-primary">
//                   Login
//                 </button>
//               </div>
//               <p>
//                 New to Reddit?{" "}
//                 <Link className="text-red-500" to={"/signup"}>
//                   Sign-up
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default LogIn;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    const data = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        data
      );
      toast.success(response.data.message);
      navigate("/"); // Redirect to home
      form.reset(); // Clear the form
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message || "Invalid login credentials!");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="card bg-base-100 w-full max-w-7xl shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <p>
                New to Reddit?{" "}
                <Link className="text-red-500" to={"/signup"}>
                  Sign-up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LogIn;
