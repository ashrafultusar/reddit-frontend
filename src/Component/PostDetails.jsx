const PostDetails = () => {
  const array = [1, 1, 1, 1, 1, 1];

  return (
    <div className="min-h-screen">
      <div className="flex ">
        {/* Left Content (Scrolling) */}
        <div className="lg:w-2/3 w-full h-screen overflow-y-auto p-4">
          <div className=" min-h-screen py-10">
            {/* Post Header Section */}
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                {/* Community Name and Timestamp */}
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Community Name</span> • 2
                  hours ago
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
                  <button className="text-blue-500 font-medium">
                    Add a comment
                  </button>
                </div>
              </div>
              <hr className="border-t border-gray-300" />
            </div>
          </div>
        </div>

              
        {/* Right Sidebar (Static) */}
        <div className="lg:w-1/3 w-full h-full p-4 bg-gray-50 border-l border-gray-300">
          <div className="sticky top-4 space-y-4">
            <div className="bg-gray-200 p-4 rounded-lg shadow">
              Sidebar Item 1
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
