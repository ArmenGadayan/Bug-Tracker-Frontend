import React, { Component } from "react";
import Table from "./common/Table";

class AdminTable extends Component {
  columns = [
    {
      path: "first_name",
      label: "Name",
    },
    { path: "username", label: "Username" },
    { path: "email", label: "Email" },
    { path: "groups", label: "Role" },
  ];

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default AdminTable;
