import React from "react";

const CommentsList = ({ bug }) => {
  const commentDisplay = (body, commenter, date) => {
    const createdDate = new Date(date).toLocaleDateString();
    return (
      <div>
        <small>
          {commenter} {createdDate}
        </small>
        <p>{body}</p>
      </div>
    );
  };

  return (
    <div className="commentsList">
      {bug.comments.map((comment) => (
        <div key={comment.id}>
          {" "}
          {commentDisplay(
            comment.body,
            comment.commenter,
            comment.created
          )}{" "}
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
