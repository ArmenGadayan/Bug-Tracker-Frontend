import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

import axios from "axios";
import config from "../services/api.json";

const UserRequest = () => {
  const [requestBody, setRequestBody] = useState("");

  let { userProfile, token } = useContext(AuthContext);

  const handleChange = (event) => {
    setRequestBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestObj = {
      body: requestBody,
      member: userProfile.id,
    };

    try {
      const response = await axios.post(
        config.apiEndpoint + `/api/requests/`,
        requestObj,
        {
          headers: { Authorization: "JWT " + token.access },
        }
      );
      setRequestBody(response.data);
      toast.success("Request sent.");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    setRequestBody("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <div>
            <textarea
              style={{ width: "180px", height: "140px" }}
              type="text"
              className="form-control"
              name="description"
              value={requestBody}
              onChange={handleChange}
            />
          </div>
        </label>

        <div>
          <input
            className="button-18 mt-2"
            disabled={requestBody.length < 3}
            type="submit"
            value="Send"
          />
        </div>
      </form>
    </div>
  );
};

export default UserRequest;
