import React from "react";

const CreatePost = () => {
  const handelCreatePost = (e) => {
    e.preventDefault();
    const from = e.target;
    const communityName = from.communityName.value;
    const title = from.title.value;
    const existingLinkFlair = from.existingLinkFlair.value;
    const addLinkFlair = from.addLinkFlair.value;
    const username = from.username.value;
    const content = from.content.value;

    console.log(
      communityName,
      title,
      existingLinkFlair,
      addLinkFlair,
      username,
      content
    );
  };

  return (
    <div>
      <section class="max-w-4xl p-8 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white text-center">
          Create New Post
        </h2>

        <form onSubmit={handelCreatePost}>
          <div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
            {/* <!-- Community Name --> */}
            <div>
              <label
                class="text-gray-700 dark:text-gray-200"
                for="communityName"
              >
                Select community <span class="text-red-600">*</span>
              </label>
              <select
                id="communityName"
                name="communityName"
                required
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="" disabled selected>
                  communities
                </option>
                <option value="community1">Am I the Jerk?</option>
                <option value="community2">The History Channel</option>
              </select>
            </div>

            {/* <!-- Title --> */}
            <div>
              <label class="text-gray-700 dark:text-gray-200" for="title">
                Title <span class="text-red-600">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            {/* <!-- Existing Link Flairs --> */}
            <div>
              <label class="text-gray-700 dark:text-gray-200" for="linkFlair">
                Existing Link Flairs <span class="text-red-600">*</span>
              </label>
              <select
                id="linkFlair"
                name="existingLinkFlair"
                required
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
                class="text-gray-700 dark:text-gray-200"
                for="addLinkFlair"
              >
                Add Link Flair (Optional)
              </label>
              <input
                id="addLinkFlair"
                name="addLinkFlair"
                type="text"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            {/* <!-- Username --> */}
            <div>
              <label class="text-gray-700 dark:text-gray-200" for="username">
                Username <span class="text-red-600">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            {/* <!-- Post Content --> */}
            <div class="col-span-2">
              <label class="text-gray-700 dark:text-gray-200" for="content">
                Post Content <span class="text-red-600">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows="6"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-[#efe6e6] border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
          </div>

          {/*  Submit Button  */}
          <div class="flex justify-center mt-8">
            <button
              type="submit"
              class="px-6 py-2.5 leading-5 text-white bg-[#FF4500] hover:bg-orange-700 rounded-md "
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
