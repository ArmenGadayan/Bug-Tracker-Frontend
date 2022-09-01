import React from "react";
import SelectOptions from "./common/SelectOptions";

const BugForm = (props) => {
  const { onSubmit, onChange, bug } = props;

  const statusOptions = [
    { value: "New", tag: "New" },
    { value: "In Progress", tag: "In Progress" },
    { value: "Resolved", tag: "Resolved" },
    { value: "Additional Info Required", tag: "Additional Info Required" },
  ];

  const typeOptions = [
    { value: "Bug", tag: "Bug" },
    { value: "Feature Request", tag: "Feature Request" },
    { value: "Other", tag: "Other" },
  ];

  const priorityOptions = [
    { value: "Low", tag: "Low" },
    { value: "Medium", tag: "Medium" },
    { value: "High", tag: "High" },
  ];

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          <h6>Title</h6>
          <input
            style={{
              width: "300px",
              textAlign: "center",
              marginBottom: "20px",
            }}
            type="text"
            name="title"
            value={bug.title || ""}
            onChange={onChange}
          />

          <SelectOptions
            onChange={onChange}
            options={statusOptions}
            defaultValue={bug.status}
            name={["status", "Status"]}
          />
          <SelectOptions
            onChange={onChange}
            options={typeOptions}
            defaultValue={bug.type}
            name={["type", "Type"]}
          />
          <SelectOptions
            onChange={onChange}
            options={priorityOptions}
            defaultValue={bug.priority}
            name={["priority", "Priority"]}
          />

          <div>
            <h6>Description</h6>
            <textarea
              style={{ width: "600px" }}
              type="text"
              className="form-control"
              name="description"
              value={bug.description || ""}
              onChange={onChange}
            />
          </div>
        </label>

        <div>
          <input
            className="button-18 mt-2"
            disabled={
              bug && (bug.description.length === 0 || bug.title.length === 0)
            }
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default BugForm;
