import React, { useState } from "react";
import MembersTable from "./MembersTable";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

const MembersList = (props) => {
  let members = props.members;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (sortColumnArg) => {
    setSortColumn(sortColumnArg);
  };

  const getPagedData = () => {
    let filtered = members;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const membersList = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: membersList };
  };

  const { totalCount, data } = getPagedData();

  return (
    <div>
      <MembersTable
        members={data}
        sortColumn={sortColumn}
        onSort={handleSort}
      />
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MembersList;
