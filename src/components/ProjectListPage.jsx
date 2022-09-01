import React, { useEffect, useState, useContext } from "react";
import config from "../services/api.json";
import axios from "axios";
import AuthContext from "../context/AuthContext";

import ProjectsTable from "./ProjectsTable";
import ProjectFormView from "./ProjectFormView";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./SearchBox";

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const [showForm, setShowForm] = useState(false);
  const [selectedEditProject, setSelectedEditProject] = useState(null);

  useEffect(() => {
    getProjects();
  }, []);

  let { userProfile } = useContext(AuthContext);

  const getProjects = async () => {
    const response = await axios.get(config.apiEndpoint + "/api/projects/");
    setProjects(response.data);
  };

  const handleEdit = (project) => {
    if (showForm) {
      setSelectedEditProject(null);
      setShowForm(false);
    } else {
      setSelectedEditProject(project);
      setShowForm(true);
    }
  };

  const handleAdd = () => {
    if (showForm) {
      setSelectedEditProject(null);
      setShowForm(false);
    } else {
      setShowForm(true);
      const nullProject = {
        title: "",
        description: "",
        members: [],
        new: true,
      };
      setSelectedEditProject(nullProject);
    }
  };

  const handleFormStateChange = () => {
    setSelectedEditProject(null);
    setShowForm(false);
  };

  const handleDelete = (project) => {
    const updatedProjects = projects.filter((m) => m.id !== project.id);
    setProjects(updatedProjects);
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
    let filtered = projects;

    if (searchQuery)
      filtered = projects.filter((p) =>
        p.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const projectsList = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: projectsList };
  };

  const { totalCount, data } = getPagedData();

  return (
    <div className="container">
      <div className="box-header mt-5">
        <span className="header-left">
          Showing {totalCount} project(s) in the database{" "}
        </span>
        {userProfile &&
          userProfile.groups &&
          ["Admin", "Manager"].some((g) => {
            if (g === userProfile.groups[0]) {
              return true;
            }
            return false;
          }) && (
            <span className="header-right">
              <button onClick={handleAdd} className="button-18" type="button">
                Add
              </button>
            </span>
          )}
      </div>
      <SearchBox value={searchQuery} onChange={handleSearch} />
      <ProjectsTable
        projects={data}
        sortColumn={sortColumn}
        onDelete={handleDelete}
        onSort={handleSort}
        onEdit={handleEdit}
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
          <ProjectFormView
            selectedProject={selectedEditProject}
            onFormStateChange={handleFormStateChange}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default ProjectListPage;
