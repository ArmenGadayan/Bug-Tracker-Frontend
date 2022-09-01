import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import ProjectForm from "./ProjectForm";

import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

import axios from "axios";
import config from "../services/api.json";

const ProjectFormView = ({ selectedProject, onFormStateChange }) => {
  const [project, setProject] = useState(selectedProject);

  const [members, setMembers] = useState(null);

  let { token } = useContext(AuthContext);

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
      setProject(project);
      let newProject = project;
      if (members) {
        let membersSelected = [];
        members.map((member) => membersSelected.push(member.id));
        newProject["members"] = membersSelected;
      }

      await axios.post(config.apiEndpoint + `/api/projects/`, newProject, {
        headers: { Authorization: "JWT " + token.access },
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
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
        config.apiEndpoint + `/api/projects/${project.id}/`,
        obj,
        {
          headers: { Authorization: "JWT " + token.access },
        }
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(config.apiEndpoint + `/api/projects/${project.id}/`, {
        headers: { Authorization: "JWT " + token.access },
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }

    onFormStateChange();
  };

  const handleSubmit = (event) => {
    if (project.new) {
      handleAdd();
    } else {
      handleUpdate();
    }
  };

  const handleReturn = () => {
    onFormStateChange();
  };

  return (
    <div className="container bug-form">
      <div className="bug-form-header">
        <div className="bug-form-return">
          <ArrowLeft className="return-btn" onClick={handleReturn} />
        </div>
        {project.new === undefined && (
          <div>
            <form onSubmit={handleDelete}>
              <button type="submit" className="btn btn-danger delete-button">
                Delete{" "}
              </button>
            </form>
          </div>
        )}
      </div>
      {project.new && <h5 className="new-ticket-header">New Project</h5>}
      <ProjectForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        project={project}
        handleMembers={handleMembers}
      />
    </div>
  );
};

export default ProjectFormView;
