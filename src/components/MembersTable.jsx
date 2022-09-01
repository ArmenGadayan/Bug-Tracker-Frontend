import React, { Component } from "react";
import Table from "./common/Table";

class MembersList extends Component {
  columns = [
    {
      path: "first_name",
      label: "Name",
    },
    { path: "email", label: "Email" },
  ];

  render() {
    const { members, onSort, sortColumn } = this.props;

    return (
      <div>
        <div className="member-header-box">Members</div>
        <Table
          columns={this.columns}
          data={members}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default MembersList;
