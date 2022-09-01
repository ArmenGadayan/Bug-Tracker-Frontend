import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/Table";
import { ReactComponent as EditIcon } from "../assets/three-dots-vertical.svg";

class ProjectsTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (project) => (
        <Link className="btn green" to={`/project/${project.id}/bugs`}>
          {project.title}
        </Link>
      ),
    },
    { path: "description", label: "Description" },
    { path: "created", label: "Created" },
    {
      key: "edit",
      content: (project) =>
        this.props.userProfile &&
        this.props.userProfile.groups &&
        ["Admin", "Manager"].some((g) => {
          if (g === this.props.userProfile.groups[0]) {
            return true;
          }
          return false;
        }) && (
          <EditIcon
            type="button"
            className="edit-btn"
            onClick={() => this.props.onEdit(project)}
          />
        ),
    },
  ];

  render() {
    const { projects, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={projects}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProjectsTable;
