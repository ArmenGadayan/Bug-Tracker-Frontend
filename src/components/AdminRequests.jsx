import React, { useState, useEffect, useContext } from "react";
import AdminRequestsTable from "./AdminRequestsTable";
import AuthContext from "../context/AuthContext";

import axios from "axios";
import config from "../services/api.json";

import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

const AdminRequests = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  let { token } = useContext(AuthContext);

  useEffect(() => {
    const getUserRequests = async () => {
      try {
        const response = await axios.get(config.apiEndpoint + `/api/requests/`);
        setUserRequests(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    getUserRequests();
  }, []);

  const handleDelete = async (request) => {
    const updatedRequests = userRequests.filter((r) => r.id !== request.id);
    setUserRequests(updatedRequests);

    try {
      await axios.delete(config.apiEndpoint + `/api/requests/${request.id}/`, {
        headers: { Authorization: "JWT " + token.access },
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (sortColumnArg) => {
    setSortColumn(sortColumnArg);
  };

  const getPagedData = () => {
    const sorted = _.orderBy(
      userRequests,
      [sortColumn.path],
      [sortColumn.order]
    );

    const requestsList = paginate(sorted, currentPage, pageSize);

    return { data: requestsList };
  };

  const { data } = getPagedData();

  return (
    <div className="container">
      <AdminRequestsTable
        userRequests={data}
        sortColumn={sortColumn}
        onSort={handleSort}
        onDelete={handleDelete}
      />
      <Pagination
        itemsCount={userRequests.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminRequests;
