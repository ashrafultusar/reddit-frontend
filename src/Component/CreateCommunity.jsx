import React from "react";
import axios from "axios";

const CreateCommunity = () => {
  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const communityName = form.communityName.value;
    const username = form.username.value;
    const description = form.description.value;

    const data = { communityName, creator: username, description };
    // console.log(data)
    axios
      .post("http://localhost:8000/api/communities", data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="mt-16">
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center">
            Create Community
          </h2>

          <form onSubmit={handelSubmit}>
            {/* Community Name and Username Fields */}
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
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
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
                  name="username"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>

            {/* Description Field */}
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                placeholder="Write about your community here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-2.5 leading-5 bg-[#FF4500] hover:bg-orange-700 rounded-md text-white"
              >
                Create Community
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CreateCommunity;
