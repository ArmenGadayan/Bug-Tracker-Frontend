import React from "react";
import CommentsSection from "./CommentsSection";

const BugSelected = ({
  bug,
  onCommentSubmit,
  projectId,
  onChange,
  comment,
  members,
}) => {
  return (
    <div className="row">
      <div className="bug-info-box">
        <small> Title </small>
        <p className="bug-info"> {bug.title}</p>
        <div>
          <div className="left-bug-panel">
            <small> Status </small>
            <p className="bug-info"> {bug.status}</p>
            <small> Priority </small>
            <p className="bug-info"> {bug.priority}</p>
          </div>
          <div className="right-bug-panel">
            <small> Type </small>
            <p className="bug-info"> {bug.type}</p>
            <small> Submitter </small>
            <p className="bug-info">
              {bug.member.first_name} {bug.member.last_name}{" "}
            </p>
          </div>
        </div>
        <small> Description </small>
        <p>{bug.description}</p>
      </div>
      <div className="bug-comment-box">
        <CommentsSection
          bug={bug}
          onCommentSubmit={onCommentSubmit}
          projectId={projectId}
          onChange={onChange}
          comment={comment}
          members={members}
        />
      </div>
    </div>
  );
};

export default BugSelected;
