const Comment = ({ comment }) => {
  return (
    <div className="pl-4 border-l border-gray-300 mb-4">
      <div className="mb-2">
        <p>
          <strong>{comment.commenter}:</strong> {comment.content}
        </p>
        <small className="text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </small>
      </div>
      {comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <Comment key={reply._id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment