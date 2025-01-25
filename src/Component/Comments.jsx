import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios(`http://localhost:8000/api/comments/${postId}`)
      .then((res) => setComments(res?.data?.comments))
      .catch((err) => console.error(err));
  }, [postId]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => <Comment key={comment._id} comment={comment} />)
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default Comments;
