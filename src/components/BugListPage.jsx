import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import config from "../services/api.json";
import axios from "axios";

import AuthContext from "../context/AuthContext";

import BugTable from "./BugTable";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./SearchBox";
import MembersList from "./MembersList";
import BugSelected from "./BugSelected";

import BugFormView from "./BugFormView";
import BugFilter from "./BugFilter";

const BugListPage = () => {
  const [bugs, setBugs] = useState([]);
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const [selectedBug, setSelectedBug] = useState({
    id: "",
    comments: [{ id: "", commenter: "", body: "", created: "" }],
  });

  const [commentBody, setCommentBody] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedEditBug, setSelectedEditBug] = useState(null);

  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  let { id: projectId } = useParams();

  let { userProfile, token } = useContext(AuthContext);

  useEffect(() => {
    const getBugs = async () => {
      try {
        const response = await axios.get(
          config.apiEndpoint + `/api/projects/${projectId}/bugs/`
        );
        setBugs(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    const getMembers = async () => {
      const response = await axios.get(
        config.apiEndpoint + `/api/projects/${projectId}/`
      );
      const members = response.data.members;
      setMembers(members);
    };

    getBugs();
    getMembers();
  }, [projectId]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    if (name === "status") {
      setSelectedStatus(value);
    } else if (name === "priority") {
      setSelectedPriority(value);
    } else if (name === "type") {
      setSelectedType(value);
    }

    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleFilterReset = () => {
    setSelectedStatus("All");
    setSelectedPriority("All");
    setSelectedType("All");
  };

  const handleEdit = (bug) => {
    if (showForm) {
      setSelectedEditBug(null);
      setShowForm(false);
    } else {
      setSelectedEditBug(bug);
      setShowForm(true);
    }
  };

  const handleFormStateChange = () => {
    setSelectedEditBug(null);
    setShowForm(false);
  };

  const handleDelete = (bug) => {
    const updatedBugs = bugs.filter((b) => b.id !== bug.id);
    setBugs(updatedBugs);
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

  const handleAdd = () => {
    if (showForm) {
      setSelectedEditBug(null);
      setShowForm(false);
    } else {
      setShowForm(true);
      const nullBug = {
        title: "",
        description: "",
        status: "New",
        type: "Bug",
        priority: "Low",
        member: "",
        new: true,
      };
      setSelectedEditBug(nullBug);
    }
  };

  const handleBugClick = (bugId) => {
    let selected = bugs.find((bug) => bug.id === bugId);
    setSelectedBug(selected);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      body: commentBody,
      commenter: `${userProfile.first_name} ${userProfile.last_name}`,
      bug: selectedBug.id,
    };
    try {
      const response = await axios.post(
        config.apiEndpoint + `/api/comments/`,
        obj,
        {
          headers: { Authorization: "JWT " + token.access },
        }
      );

      obj["created"] = new Date();
      obj["id"] = response.data.id;

      let selected = bugs.find((bug) => bug.id === selectedBug.id);
      selected.comments.push(obj);

      setBugs(bugs);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }

    setCommentBody("");
  };

  const getSelectedBug = () => {
    let selected = bugs.find((bug) => {
      return bug.id === selectedBug.id;
    });
    if (selected) {
      return selected;
    }
    return selectedBug;
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setCommentBody(value);
  };

  const getPagedData = () => {
    let filtered = bugs;

    if (searchQuery)
      filtered = bugs.filter((b) =>
        b.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    if (selectedPriority !== "All") {
      filtered = filtered.filter((b) => b.priority === selectedPriority);
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter((b) => b.status === selectedStatus);
    }

    if (selectedType !== "All") {
      filtered = filtered.filter((b) => b.type === selectedType);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const bugsList = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: bugsList };
  };

  const { totalCount, data } = getPagedData();

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="left">
          <Link to={`/home`} className="button-return" type="button">
            Return
          </Link>
          <div className="members-list">
            <MembersList projectId={projectId} members={members} />
          </div>
        </div>
        <div className="right">
          <div className="box-header">
            <span className="header-left">
              Showing {totalCount} bug(s) in the database.{" "}
            </span>
            {userProfile &&
              userProfile.groups &&
              ["Admin", "Manager", "Developer"].some((g) => {
                if (
                  g === userProfile.groups[0] &&
                  (g === "Admin" || g === "Manager")
                ) {
                  return true;
                }

                let memberExists = false;
                members.forEach((member) => {
                  if (member.id === userProfile.id) {
                    memberExists = true;
                  }
                });

                if (memberExists && userProfile.groups[0] !== "Viewer") {
                  return true;
                }

                return false;
              }) && (
                <span className="header-right">
                  <button
                    onClick={handleAdd}
                    className="button-18"
                    type="button"
                  >
                    Add
                  </button>
                </span>
              )}
          </div>

          <SearchBox value={searchQuery} onChange={handleSearch} />

          <div className="row filter">
            <BugFilter
              onChange={handleFilterChange}
              type={selectedType}
              priority={selectedPriority}
              status={selectedStatus}
            />
            <button
              className="btn btn-secondary filter-reset-button ml-3"
              onClick={handleFilterReset}
            >
              Reset
            </button>
          </div>

          <BugTable
            bugs={data}
            sortColumn={sortColumn}
            onDelete={handleDelete}
            onSort={handleSort}
            onEdit={handleEdit}
            onBugClick={handleBugClick}
            userProfile={userProfile}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          {showForm && (
            <div className="popup">
              {" "}
              <BugFormView
                bug={selectedEditBug}
                projectId={projectId}
                onFormStateChange={handleFormStateChange}
              />{" "}
            </div>
          )}

          {bugs.length > 0 && (
            <div className="selected-ticket-box">
              <div className="selected-header-box">
                Selected Ticket Information
              </div>
              {selectedBug.id !== "" && (
                <BugSelected
                  bug={getSelectedBug()}
                  onCommentSubmit={handleCommentSubmit}
                  projectId={projectId}
                  onChange={handleChange}
                  comment={commentBody}
                  members={members}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BugListPage;
