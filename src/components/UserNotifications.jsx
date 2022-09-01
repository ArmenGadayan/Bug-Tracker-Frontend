import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../services/api.json";

const UserNotifications = () => {
  const [mail, setMail] = useState([]);

  useEffect(() => {
    const getMail = async () => {
      try {
        const response = await axios.get(
          config.apiEndpoint + `/api/notifications/`
        );
        setMail(response.data.reverse());
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    getMail();
  }, []);

  return (
    <div className="mailList">
      {mail.map((m) => (
        <div key={m.id}>
          {" "}
          <small>{new Date(m.created).toLocaleDateString()}</small>{" "}
          <p>{m.body}</p>
        </div>
      ))}
    </div>
  );
};

export default UserNotifications;
