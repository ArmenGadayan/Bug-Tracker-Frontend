import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProjectForm from "./ProjectForm";

import axios from "axios";
import config from "../services/api.json";

const Project = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
  });

  const [members, setMembers] = useState(null);

  let { id: projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      if (projectId === "new") return;
      try {
        const response = await axios.get(
          config.apiEndpoint + `/api/projects/${projectId}/`
        );
        setProject(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    getProject();
  }, [projectId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMembers = (selected) => {
    setMembers(selected);
  };

  const handleAdd = async () => {
    try {
      let newProject = project;
      if (members) {
        let membersSelected = [];
        members.map((member) => membersSelected.push(member.id));
        newProject["members"] = membersSelected;
      }
      await axios.post(config.apiEndpoint + `/api/projects/`, newProject);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(config.apiEndpoint + `/api/projects/${projectId}/`);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    navigate(`/home`);
  };

  const handleUpdate = async () => {
    try {
      let obj = {
        title: project.title,
        description: project.description,
      };
      if (members) {
        let membersSelected = [];
        members.map((member) => membersSelected.push(member.id));
        obj["members"] = membersSelected;
      }

      await axios.patch(
        config.apiEndpoint + `/api/projects/${projectId}/`,
        obj
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (projectId === "new") {
      handleAdd();
    } else {
      handleUpdate();
    }
    navigate(`/home`);
  };

  return (
    <div>
      <Link to={`/home`} className="btn btn-primary">
        {"<-"}
      </Link>
      {projectId !== "new" && (
        <button onClick={handleDelete} className="btn btn-danger">
          Delete{" "}
        </button>
      )}
      <ProjectForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleMembers={handleMembers}
        project={project}
      />
    </div>
  );
};

export default Project;
