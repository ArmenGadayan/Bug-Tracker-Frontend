import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

import axios from "axios";
import config from "../services/api.json";

const AdminMail = () => {
  const [notification, setNotification] = useState("");

  let { token } = useContext(AuthContext);

  const handleChange = (event) => {
    setNotification(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const notificationObj = {
      body: notification,
    };

    try {
      await axios.post(
        config.apiEndpoint + "/api/notifications/",
        notificationObj,
        {
          headers: { Authorization: "JWT " + token.access },
        }
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    setNotification("");
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
              value={notification}
              onChange={handleChange}
            />
          </div>
        </label>

        <div>
          <input
            className="button-18 mt-2"
            disabled={notification.length < 3 || notification.length >= 500}
            type="submit"
            value="Send"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminMail;
