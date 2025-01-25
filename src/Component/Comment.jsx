import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="mb-4">
        {/* Comment */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <p className="font-semibold text-gray-700">{comment.commenter}</p>
            <span className="mx-2 text-gray-500">|</span>
            <ElapsedTime timestamp={comment.createdAt} />
          </div>
          <p className="text-gray-600">{comment.content}</p>
          <Link
            to={`/comment-page/${comment.postId}`}
            className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 mt-2 text-sm font-medium hover:bg-blue-200"
          >
            Reply
          </Link>
        </div>
        {/* Replies */}
        <div className="pl-6 border-l border-gray-300 mt-2">
          {comment.replies.map((reply) => (
            <Comment key={reply._id} comment={reply} />
          ))}
        </div>
      </div>
    );
};

export default Comment;