import { Link } from "react-router-dom";

const Post = () => {
  const description = `Does anyone else remember when they used to show actual historical content on the channel? 
    Does anyone else remember when they used to show actual historical content on the channel?`;

  const array = [1, 1, 1, 1, 1, 1];

  return (
    <div className="space-y-6 flex flex-col items-center">
      {array.map((item) => (
        <Link to={"/postD"}>
        <div className="card bg-white max-w-2xl shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-4">
  <div className="card-header p-3 flex justify-between items-center">
    <div className="text-sm text-gray-600">
      <span className="font-medium">The History Channel</span> • 
      <span className="ml-1">MarcoArelius</span> • 
      <span className="ml-1 text-gray-500">1 year(s) ago</span>
    </div>
  </div>
  <hr className="border-dotted border-gray-400" />
  <div className="card-body p-5">
    <h2 className="text-xl font-semibold text-gray-800 leading-tight">
      Remember when this was a HISTORY channel?
    </h2>
    <p className="text-sm text-blue-500 mt-2">Link Flair (optional)</p>
    <p className="text-sm text-gray-600 mt-2">
      {description.split(" ").slice(0, 15).join(" ")}...
    </p>
    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
      <span>👁️ 1,023 Views</span>
      <span>💬 4 Comments</span>
    </div>
  </div>
</div>

        </Link>
      ))}
    </div>
  );
};

export default Post;
