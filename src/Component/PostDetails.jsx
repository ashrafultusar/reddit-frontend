const PostDetails = () => {
  const handelsubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    console.log(comment);
  };

  return (
    <div className="">
      <div className="py-10">
        {/* Post Header Section */}
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            {/* Community Name and Timestamp */}
            <div className="text-sm text-gray-500">
              <span className="font-semibold">Community Name</span> • 2 hours
              ago
            </div>
            {/* Username */}
            <div className="text-sm text-gray-500 mt-1">
              Posted by <span className="font-medium">MarcoArelius</span>
            </div>
            {/* Post Title */}
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              Remember when this was a HISTORY channel?
            </h1>
            {/* Link Flair */}
            <div className="mt-2">
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                History
              </span>
            </div>
            {/* Post Content */}
            <p className="text-gray-700 mt-4">
              The walk among us. This is a description.
            </p>
            {/* View and Comment Count */}
            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <div className="flex space-x-4">
                <span>👁️ 1,023 Views</span>
                <span>💬 4 Comments</span>
              </div>
            </div>
          </div>
          <hr className="" />
          {/* Comment Section */}
          <div className="p-4">
            <form onSubmit={handelsubmit} className="flex w-full">
              <input
                type="text"
                name="comment"
                className="w-full px-2 py-1 border border-gray-300 rounded-l-md"
                placeholder="Add a comment..."
              />
              <input
                type="submit"
                className="bg-blue-400 px-4 py-1 rounded-r-md text-white cursor-pointer"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
