import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";


const Table = ({ columns, sortColumn, onSort, data, name }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
