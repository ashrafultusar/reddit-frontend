const Post = () => {
  const description = `Does anyone else remember when they used to show actual historical content on the channel? 
    Does anyone else remember when they used to show actual historical content on the channel?`;

  const array = [1, 1, 1, 1, 1, 1];

  return (
    <div className="space-y-6 ">
      {array.map((item) => (
        <div className="card bg-white w-96 shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <figure>
            <img
              src="https://i.ibb.co.com/xJKzTGV/ef-Re-IA6-MRd-O455-Tq-VICEUQ.jpg"
              alt="History Channel"
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body p-5">
            <div className=" flex justify-between ">
              <div className="badge bg-base-300 px-3 py-1 text-xs rounded-full">
                The History Channel
              </div>
              <div className="badge bg-base-300 px-3 py-1 text-xs rounded-full">
                MarcoArelius
              </div>
            </div>
            <hr />
            <h2 className="text-xl font-semibold text-gray-800 leading-tight">
              Remember when this was a HISTORY channel?
            </h2>
            <p>The walk among us</p>
            <p className="text-sm text-gray-600 mt-2">
              {description.split(" ").slice(0, 15).join(" ")}...
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>👁️ 1,023 Views</span>
                <div className="divider lg:divider-horizontal"></div>

                <span>💬 4 Comments</span>
              </div>

              <div className="text-xs text-blue-500 font-medium">
                1 year(s) ago
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
