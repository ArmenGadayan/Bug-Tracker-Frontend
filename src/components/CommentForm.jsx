import React from "react";

const CommentForm = ({
  onCommentSubmit,
  onChange,
  comment,
  userProfile,
  members,
}) => {
  return (
    <div>
      {userProfile &&
        ["Admin", "Manager", "Developer"].some((g) => {
          if (g === userProfile.groups[0]) {
            return true;
          }

          let memberExists = false;
          members.forEach((member) => {
            if (member.id === userProfile.id) {
              memberExists = true;
            }
          });

          if (memberExists) {
            return true;
          }

          return false;
        }) && (
          <form onSubmit={onCommentSubmit}>
            <input
              className="form-control mb-2 mt-2"
              style={{ display: "inline-block", width: "90%" }}
              type="text"
              name="comment"
              value={comment}
              onChange={onChange}
            />

            <input
              className="button-18"
              disabled={comment.length === 0 || comment.length >= 500}
              type="submit"
              value="Comment"
            />
          </form>
        )}
    </div>
  );
};

export default CommentForm;
