import React from "react";
import SelectOptions from "./common/SelectOptions";

const BugFilter = ({ type, priority, status, onChange }) => {
  const statusOptions = [
    { value: "New", tag: "New" },
    { value: "In Progress", tag: "In Progress" },
    { value: "Resolved", tag: "Resolved" },
    { value: "Additional Info Required", tag: "Additional Info Required" },
    { value: "All", tag: "All" },
  ];

  const typeOptions = [
    { value: "Bug", tag: "Bug" },
    { value: "Feature Request", tag: "Feature Request" },
    { value: "Other", tag: "Other" },
    { value: "All", tag: "All" },
  ];

  const priorityOptions = [
    { value: "Low", tag: "Low" },
    { value: "Medium", tag: "Medium" },
    { value: "High", tag: "High" },
    { value: "All", tag: "All" },
  ];

  return (
    <div>
      <span className="row">
        <SelectOptions
          onChange={onChange}
          options={statusOptions}
          defaultValue={status}
          name={["status", "Status"]}
        />
        <SelectOptions
          onChange={onChange}
          options={typeOptions}
          defaultValue={type}
          name={["type", "Type"]}
        />
        <SelectOptions
          onChange={onChange}
          options={priorityOptions}
          defaultValue={priority}
          name={["priority", "Priority"]}
        />
      </span>
    </div>
  );
};

export default BugFilter;
