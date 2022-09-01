import React, { useContext } from "react";
import CommentsList from "./CommentsList";
import AuthContext from "../context/AuthContext";

import CommentForm from "./CommentForm";

const CommentsSection = ({
  bug,
  onCommentSubmit,
  projectId,
  onChange,
  comment,
  members,
}) => {
  let { userProfile } = useContext(AuthContext);
  let name = `${userProfile.first_name} ${userProfile.last_name}`;

  return (
    <div className="commentsSection">
      <h6>Comments</h6>
      <CommentsList bug={bug} projectId={projectId} />
      <CommentForm
        bug={bug}
        name={name}
        onCommentSubmit={onCommentSubmit}
        onChange={onChange}
        comment={comment}
        userProfile={userProfile}
        members={members}
      />
    </div>
  );
};

export default CommentsSection;
