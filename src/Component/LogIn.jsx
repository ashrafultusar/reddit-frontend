import React from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col ">
          <div className="card bg-base-100 w-full max-w-7xl shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
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
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <p>
              New to Reddit <Link className="text-red-500" to={'/signup'}>Sign-up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
