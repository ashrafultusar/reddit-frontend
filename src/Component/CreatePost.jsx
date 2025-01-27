import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    axios("http://localhost:8000/api/communities")
      .then((res) => setCommunities(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handelCreatePost = (e) => {
    e.preventDefault();
    const from = e.target;
    const communityName = from.communityName.value;
    const title = from.title.value;
    const existingLinkFlair = from.existingLinkFlair.value;
    const addLinkFlair = from.addLinkFlair.value;
    const username = user?.displayName;
    const content = from.content.value;
    const email = user?.email;

    const postData = {
      communityName,
      title,
      existingLinkFlair,
      addLinkFlair,
      author: username,
      content,
      email,
      authorEmail: email,
    };

    axios
      .post("http://localhost:8000/api/posts", postData)
      .then((res) => {
        toast.success("Post add successfully");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };
  console.log(user);
  return (
    <div>
      <section className="max-w-4xl p-8 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white text-center">
          Create New Post
        </h2>

        <form onSubmit={handelCreatePost}>
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
            {/* <!-- Community Name --> */}
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="communityName"
              >
                Select community <span className="text-red-600">*</span>
              </label>
              <select
                id="communityName"
                name="communityName"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="" disabled selected>
                  communities
                </option>
                {communities?.map((community, index) => (
                  <option key={index} value={community?.communityName}>
                    {community?.communityName}
                  </option>
                ))}
              </select>
            </div>

            {/* <!-- Title --> */}
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="title"
              >
                Title <span className="text-red-600">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            {/* <!-- Existing Link Flairs --> */}
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="linkFlair"
              >
                Existing Link Flairs <span className="text-red-600">*</span>
              </label>
              <select
                id="linkFlair"
                name="existingLinkFlair"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="" disabled selected>
                  Link flairs
                </option>
                <option value="flair1">lf1: The ierkstore called...</option>
                <option value="flair2">lf2: Literal Saint</option>
                <option value="flair3">lf3: The walk among us</option>
                <option value="flair3">lf4: Worse then Hitler</option>
              </select>
            </div>

            {/* <!-- Add Link Flair --> */}
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="addLinkFlair"
              >
                Add Link Flair (Optional)
              </label>
              <input
                id="addLinkFlair"
                name="addLinkFlair"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            {/* <!-- Username --> */}
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
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            {/* <!-- Post Content --> */}
            <div className="col-span-2">
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="content"
              >
                Post Content <span className="text-red-600">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows="6"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
          </div>

          {/*  Submit Button  */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-6 py-2.5 leading-5 text-white bg-[#FF4500] hover:bg-orange-700 rounded-md "
            >
              Submit Post
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreatePost;
