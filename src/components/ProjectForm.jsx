import React from "react";
import MembersSelect from "./MembersSelect";

const ProjectForm = (props) => {
  const { onSubmit, onChange, handleMembers, project } = props;
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          <h6>Title</h6>
          <input
            type="text"
            name="title"
            value={project.title || ""}
            onChange={onChange}
            className="mb-3"
          />

          <div>
            <h6>Description</h6>
            <textarea
              className="form-control mb-3"
              style={{ width: "600px" }}
              name="description"
              value={project.description || ""}
              onChange={onChange}
            />
          </div>

          <h6>Select Members</h6>
          <MembersSelect
            selectedMembers={project.members}
            handleMembers={handleMembers}
          />

          <div className="mt-3">
            <input
              className="button-18"
              disabled={
                project &&
                (project.title.length === 0 || project.description.length === 0)
              }
              type="submit"
              value="Submit"
            />
          </div>
        </label>
      </form>
    </div>
  );
};

export default ProjectForm;
