import React, { Component } from "react";
import Table from "./common/Table";
import { ReactComponent as EditIcon } from "../assets/three-dots-vertical.svg";

class BugTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (bug) => (
        <button
          type="button"
          className="btn green"
          onClick={() => this.props.onBugClick(bug.id)}
        >
          {bug.title}
        </button>
      ),
    },
    { path: "description", label: "Description" },
    { path: "status", label: "Status" },
    { path: "type", label: "Type" },
    { path: "priority", label: "Priority" },
    { path: "created", label: "Created" },
    {
      key: "edit",
      content: (bug) =>
        this.props.userProfile &&
        this.props.userProfile.groups &&
        ["Admin", "Manager", "Developer"].some((g) => {
          if (
            g === this.props.userProfile.groups[0] &&
            (g === "Admin" || g === "Manager")
          ) {
            return true;
          }

          if (bug.member && bug.member.id === this.props.userProfile.id) {
            return true;
          }

          return false;
        }) && (
          <EditIcon
            type="button"
            className="edit-btn"
            onClick={() => this.props.onEdit(bug)}
          />
        ),
    },
  ];

  render() {
    const { bugs, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={bugs}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BugTable;
