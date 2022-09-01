import React, { useContext, useState, useEffect } from "react";
import AdminTable from "./AdminTable";
import AdminRequests from "./AdminRequests";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

import AuthContext from "../context/AuthContext";
import config from "../services/api.json";
import axios from "axios";

const AdminPage = () => {
  let { userProfile, token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    if (userProfile.groups[0] !== "Admin") {
      return <h3> You don't have the permission to access this page</h3>;
    }

    const getUsers = async () => {
      try {
        const response = await axios.get(
          config.apiEndpoint + "/api/all-users/",
          {
            headers: { Authorization: "JWT " + token.access },
          }
        );
        setUsers(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    getUsers();
  }, [token.access, userProfile.groups]);

  const handleSort = (sortColumnArg) => {
    setSortColumn(sortColumnArg);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getPagedData = () => {
    const sorted = _.orderBy(users, [sortColumn.path], [sortColumn.order]);

    const usersList = paginate(sorted, currentPage, pageSize);

    return { totalCount: users.length, data: usersList };
  };

  const { data } = getPagedData();

  return (
    <div className="mt-5">
      <div className="header-box">Administration</div>

      <div className="container">
        <AdminTable users={data} sortColumn={sortColumn} onSort={handleSort} />
        <Pagination
          itemsCount={users.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="header-box mt-5">User Requests</div>
      <AdminRequests />

      <a
        href="http://127.0.0.1:8000/admin/"
        rel="noreferrer"
        target="_blank"
        className="nav-item nav-link"
      >
        Click here for more administrative options
      </a>
    </div>
  );
};

export default AdminPage;
