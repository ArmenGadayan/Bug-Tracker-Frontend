import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../services/api.json";
import jwt_decode from "jwt-decode";

import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let [userProfile, setUserProfile] = useState(() =>
    localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null
  );

  const navigate = useNavigate();

  let loginUser = async (e, object = null) => {
    if (!object) e.preventDefault();

    const obj = object
      ? object
      : {
          username: e.target.username.value,
          password: e.target.password.value,
        };

    try {
      const response = await axios.post(
        config.apiEndpoint + "/auth/jwt/create/",
        obj
      );

      if (response.status === 200) {
        setAuthTokens(response.data);

        setUser(jwt_decode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));

        getUserProfile(response.data.access);
        //

        navigate("/home");
      } else {
        alert("Invalid input placed");
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
      toast.error("Invalid username or password.");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("userProfile");
  };

  let registerUser = async (e) => {
    e.preventDefault();
    let obj = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
    };
    try {
      const response = await axios.post(
        config.apiEndpoint + "/auth/users/",
        obj
      );

      if (response.status >= 200 && response.status < 300) {
        const object = { username: obj.username, password: obj.password };
        loginUser(null, object);
      } else {
        alert("Invalid input placed");
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
      toast.error("Username or email already exists.");
    }
  };

  let getUserProfile = async (token) => {
    try {
      const response = await axios.get(config.apiEndpoint + "/auth/users/me/", {
        headers: { Authorization: "JWT " + token },
      });
      setUserProfile(response.data);
      localStorage.setItem("userProfile", JSON.stringify(response.data));
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  let contextData = {
    token: authTokens,
    user: user,
    userProfile: userProfile,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
