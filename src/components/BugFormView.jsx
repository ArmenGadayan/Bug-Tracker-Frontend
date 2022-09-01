import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import BugForm from "./BugForm";

import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

import axios from "axios";
import config from "../services/api.json";

const BugFormView = (props) => {
  const [bug, setBug] = useState(props.bug);

  let { user, token } = useContext(AuthContext);

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
        config.apiEndpoint + `/api/projects/${props.projectId}/bugs/`,
        bug,
        {
          headers: { Authorization: "JWT " + token.access },
        }
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
        config.apiEndpoint +
          `/api/projects/${props.projectId}/bugs/${props.bug.id}/`,
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
      await axios.delete(
        config.apiEndpoint +
          `/api/projects/${props.projectId}/bugs/${props.bug.id}/`,
        {
          headers: { Authorization: "JWT " + token.access },
        }
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }

    props.onFormStateChange();
  };

  const handleSubmit = (event) => {
    if (props.bug.new) {
      handleAdd();
    } else {
      handleUpdate();
    }
  };

  const handleReturn = () => {
    props.onFormStateChange();
  };

  return (
    <div className="container bug-form">
      <div className="bug-form-header">
        <div className="bug-form-return">
          <ArrowLeft className="return-btn" onClick={handleReturn} />
        </div>
        {props.bug.new === undefined && (
          <div>
            <form onSubmit={handleDelete}>
              <button type="submit" className="btn btn-danger delete-button">
                Delete{" "}
              </button>
            </form>
          </div>
        )}
      </div>
      {props.bug.new && <h5 className="new-ticket-header">New Ticket</h5>}
      <BugForm onSubmit={handleSubmit} onChange={handleChange} bug={bug} />
      {props.bug.new === undefined && bug.member && (
        <div>
          Submitter: {bug.member.first_name} {bug.member.last_name}
        </div>
      )}
    </div>
  );
};

export default BugFormView;
