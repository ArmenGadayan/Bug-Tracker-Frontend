import React, { Component } from "react";
import Table from "./common/Table";
import { ReactComponent as EditIcon } from "../assets/three-dots-vertical.svg";

class UserTicketsTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
    },
    { path: "description", label: "Description" },
    { path: "status", label: "Status" },
    { path: "type", label: "Type" },
    { path: "priority", label: "Priority" },
    { path: "created", label: "Created" },
    {
      key: "edit",
      content: (ticket) => (
        <EditIcon
          type="button"
          className="edit-btn"
          onClick={() => this.props.onEdit(ticket)}
        />
      ),
    },
  ];

  render() {
    const { tickets, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={tickets}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UserTicketsTable;
