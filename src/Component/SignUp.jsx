import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // full name
    const name = `${firstName} ${lastName}`;

    // matching between two password field
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const data = { name, email, password };

    axios
      .post("http://localhost:8000/api/auth/register", data)
      .then(() => {
        toast.success("Account created successfully!");
        form.reset();
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.error || "Email already in use!");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="hero min-h-screen">
        <div className="hero-content flex-col ">
          <div className="card bg-base-100 w-full max-w-7xl shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
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
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
              <p>
                Already a redditor?{" "}
                <Link className="text-red-500" to={"/login"}>
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
