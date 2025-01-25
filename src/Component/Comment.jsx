import { Link } from "react-router-dom";
import { ElapsedTime } from "./PostDetails";

const Comment = ({ comment, postId }) => {
  const { commenter, content, createdAt, replies, _id } = comment;
  return (
    <div className="pl-4 border-l border-gray-300 mb-4">
      <div className="mb-2">
        <p>
          <strong>{commenter}:</strong>
          <small className="text-gray-500">
            <ElapsedTime timestamp={createdAt} />
          </small>
        </p>
        <p>{content}</p>
        <Link
          to={`/comment-page/${postId}?parentComment=${_id}`}
          className="px-2 rounded-md text-white font-semibold text-xs bg-orange-600"
        >
          Replay
        </Link>
      </div>
      {replies?.length > 0 && (
        <div>
          {replies?.map((reply) => (
            <Comment key={reply._id} comment={reply} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
