import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import config from "../services/api.json";

import UserTicketsTable from "./UserTicketsTable";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./SearchBox";
import AllCharts from "./AllCharts";
import BugFormTest from "./BugFormView";

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const [showForm, setShowForm] = useState(false);
  const [selectedEditBug, setSelectedEditBug] = useState(null);

  let { token } = useContext(AuthContext);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await axios.get(
          config.apiEndpoint + `/api/member-bugs/`,
          {
            headers: { Authorization: "JWT " + token.access },
          }
        );
        setTickets(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    getTickets();
  }, [token.access]);

  const handleEdit = (bug) => {
    if (showForm) {
      setSelectedEditBug(null);
      setShowForm(false);
    } else {
      setSelectedEditBug(bug);
      setShowForm(true);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (sortColumnArg) => {
    setSortColumn(sortColumnArg);
  };

  const getPagedData = () => {
    let filtered = tickets;

    if (searchQuery)
      filtered = tickets.filter((t) =>
        t.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const ticketsList = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: ticketsList };
  };

  const handleFormStateChange = () => {
    setSelectedEditBug(null);
    setShowForm(false);
  };

  const { totalCount, data } = getPagedData();

  return (
    <div className="container mt-3">
      <div>Showing {totalCount} ticket(s).</div>
      <SearchBox value={searchQuery} onChange={handleSearch} />
      <UserTicketsTable
        tickets={data}
        sortColumn={sortColumn}
        onSort={handleSort}
        onEdit={handleEdit}
      />
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <div className="mt-5">
        {tickets.length !== 0 && <AllCharts data={tickets} />}
      </div>

      {showForm && (
        <div className="popup">
          {" "}
          <BugFormTest
            bug={selectedEditBug}
            projectId={selectedEditBug.project}
            onFormStateChange={handleFormStateChange}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default UserTickets;
