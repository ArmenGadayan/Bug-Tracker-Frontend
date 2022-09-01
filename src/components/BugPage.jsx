import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import BugForm from "./BugForm";

import axios from "axios";
import config from "../services/api.json";

const BugPage = () => {
  const [bug, setBug] = useState({
    title: "",
    description: "",
    status: "New",
    type: "Bug",
    priority: "Low",
    member: "",
  });

  let { bugId, id: projectId } = useParams();
  const navigate = useNavigate();

  let { user } = useContext(AuthContext);

  useEffect(() => {
    const getBug = async () => {
      if (bugId === "new") return;
      try {
        const response = await axios.get(
          config.apiEndpoint + `/api/projects/${projectId}/bugs/${bugId}/`
        );
        setBug(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    getBug();
  }, [bugId, projectId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBug((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      bug.member = user.user_id;
      setBug(bug);
      await axios.post(
        config.apiEndpoint + `/api/projects/${projectId}/bugs/`,
        bug
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleUpdate = async () => {
    try {
      const obj = {
        title: bug.title,
        description: bug.description,
        status: bug.status,
        type: bug.type,
        priority: bug.priority,
      };
      await axios.put(
        config.apiEndpoint + `/api/projects/${projectId}/bugs/${bugId}/`,
        obj
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        config.apiEndpoint + `/api/projects/${projectId}/bugs/${bugId}/`
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    // navigate(`/project/${projectId}/bugs`);
    navigate(-1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (bugId === "new") {
      handleAdd();
    } else {
      handleUpdate();
    }
    // navigate(`/project/${projectId}/bugs`);
    navigate(-1);
  };

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="container bug-form">
      {/* <Link to={`/project/${projectId}/bugs`} className="btn btn-primary">
        {"<-"}
      </Link> */}
      <button onClick={handleReturn} className="btn btn-primary">
        {"<-"}
      </button>
      {bugId !== "new" && (
        <button onClick={handleDelete} className="btn btn-danger">
          Delete{" "}
        </button>
      )}
      <BugForm onSubmit={handleSubmit} onChange={handleChange} bug={bug} />
      {bugId !== "new" && bug.member && (
        <p>
          Submitter: {bug.member.first_name} {bug.member.last_name}
        </p>
      )}
    </div>
  );
};

export default BugPage;
