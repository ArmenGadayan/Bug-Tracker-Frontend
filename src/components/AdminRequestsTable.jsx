import React, { Component } from "react";
import Table from "./common/Table";
import { ReactComponent as DeleteIcon } from "../assets/delete-icon.svg";

class AdminRequestsTable extends Component {
  columns = [
    {
      path: "body",
      label: "Request",
    },
    { path: "member.first_name", label: "Requester" },
    { path: "member.email", label: "Email" },
    { path: "created", label: "Created" },
    {
      key: "delete",
      content: (request) => (
        <DeleteIcon
          type="button"
          className="delete-admin-btn"
          onClick={() => this.props.onDelete(request)}
        />
      ),
    },
  ];

  render() {
    const { userRequests, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={userRequests}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default AdminRequestsTable;
