import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserRequest from "./UserRequest";
import AdminMail from "./AdminMail";
import UserNotifications from "./UserNotifications";

import { ReactComponent as DashboardIcon } from "../assets/dashboard-icon.svg";
import { ReactComponent as TicketsIcon } from "../assets/tickets-icon.svg";
import { ReactComponent as AdminIcon } from "../assets/admin-icon.svg";
import { ReactComponent as BugIcon } from "../assets/bug-icon.svg";
import { ReactComponent as RequestIcon } from "../assets/request-icon.svg";
import { ReactComponent as MailIcon } from "../assets/mail-icon.svg";
import { ReactComponent as NotificationIcon } from "../assets/notification-icon.svg";

const NavBar = () => {
  const [showRequest, setShowRequest] = useState(false);

  const [adminMail, setAdminMail] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleRequestShow = () => {
    setShowRequest(!showRequest);
  };

  const handleAdminMail = () => {
    setAdminMail(!adminMail);
  };

  const handleShowNotification = () => {
    setShowNotification(!showNotification);
  };

  let { user, userProfile, logoutUser } = useContext(AuthContext);
  return (
    <nav className="sidebar">
      <div>
        <Link
          className="sidebar-title"
          style={{ textDecoration: "none" }}
          to="/"
        >
          <BugIcon className="bug-icon" /> Bug-Tracker
        </Link>
      </div>

      {user && userProfile && <p> Hello {userProfile.first_name} </p>}

      <div>
        <Link className="btn sidebar-btn mt-1" to="/home">
          <DashboardIcon className="dashboard-icon" /> Dashboard{" "}
        </Link>
      </div>

      {userProfile &&
        userProfile.groups[0] &&
        userProfile.groups[0] !== "Viewer" && (
          <div>
            <Link className="btn sidebar-btn" to="/tickets">
              <TicketsIcon className="tickets-icon" /> My Tickets{" "}
            </Link>
          </div>
        )}

      {user && userProfile && userProfile.groups[0] === "Admin" && (
        <div>
          <Link className="btn sidebar-btn" to="/admin">
            <AdminIcon className="admin-icon" /> Admin
          </Link>
        </div>
      )}

      {user && userProfile && userProfile.groups[0] !== "Admin" && (
        <button
          className="btn sidebar-btn mb-3"
          onClick={handleShowNotification}
        >
          <NotificationIcon className="notification-icon" /> Notifications
        </button>
      )}
      {showNotification &&
        user &&
        userProfile &&
        userProfile.groups[0] !== "Admin" && <UserNotifications />}

      <div className="mt-2">
        {user && userProfile && userProfile.groups[0] !== "Admin" && (
          <button className="btn sidebar-btn mb-3" onClick={handleRequestShow}>
            <RequestIcon className="request-icon" /> Request to Admin
          </button>
        )}
        {showRequest && user && <UserRequest />}
      </div>

      <div className="mt-3">
        {user && userProfile && userProfile.groups[0] === "Admin" && (
          <button className="btn sidebar-btn mb-3" onClick={handleAdminMail}>
            <MailIcon className="request-icon" /> Mail to Members
          </button>
        )}
        {adminMail &&
          user &&
          userProfile &&
          userProfile.groups[0] === "Admin" && <AdminMail />}
      </div>

      {userProfile && (
        <p>
          Role:{" "}
          {(userProfile && userProfile.groups && userProfile.groups[0]) ||
            "N/A"}{" "}
        </p>
      )}

      <hr className="line" />

      <div>
        {user ? (
          <Link
            className="btn btn-danger mt-2"
            onClick={logoutUser}
            to="/login"
          >
            Logout
          </Link>
        ) : (
          <Link className="btn btn-primary mt-2" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
