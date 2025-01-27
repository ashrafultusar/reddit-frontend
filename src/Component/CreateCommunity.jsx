import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const CreateCommunity = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateInputs = (communityName, username, description) => {
    const newErrors = {};
    if (!communityName || communityName.trim() === "") {
      newErrors.communityName = "Community Name is required.";
    } else if (communityName.length > 100) {
      newErrors.communityName =
        "Community Name must not exceed 100 characters.";
    }

    if (!description || description.trim() === "") {
      newErrors.description = "Description is required.";
    } else if (description.length > 500) {
      newErrors.description = "Description must not exceed 500 characters.";
    }

    if (!username || username.trim() === "") {
      newErrors.username = "Username is required.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const communityName = form.communityName.value;
    const username = user?.displayName;
    const description = form.description.value;
    const email = user?.email;

    const validationErrors = validateInputs(
      communityName,
      username,
      description,
      email
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = { communityName, creator: username, description,email };

    axios
      .post("http://localhost:8000/api/communities", data)
      .then((res) => {
        toast.success("Community created successfully");
      })
      .catch((err) => {
        toast.error("An error occurred while creating the community.");
        console.error(err);
      });
  };

  return (
    <div>
      <div className="mt-16">
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center">
            Create Community
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="communityName"
                >
                  Community Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="communityName"
                  name="communityName"
                  type="text"
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring ${
                    errors.communityName
                      ? "border-red-500"
                      : "focus:border-blue-400"
                  }`}
                />
                {errors.communityName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.communityName}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="username"
                >
                  Username <span className="text-red-600">*</span>
                </label>
                <input
                  id="username"
                  disabled
                  placeholder={user?.displayName}
                  type="text"
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring ${
                    errors.username ? "border-red-500" : "focus:border-blue-400"
                  }`}
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="description"
              >
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring ${
                  errors.description
                    ? "border-red-500"
                    : "focus:border-blue-400"
                }`}
                placeholder="Write about your community here..."
              ></textarea>
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-2.5 leading-5 bg-[#FF4500] hover:bg-orange-700 rounded-md text-white"
              >
                Engender Community
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CreateCommunity;
