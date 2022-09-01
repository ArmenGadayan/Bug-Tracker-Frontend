import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/Form";
import AuthContext from "../context/AuthContext";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  static contextType = AuthContext;

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  render() {
    return (
      <div className="container mt-5">
        <h1>Login</h1>
        <AuthContext.Consumer>
          {(authContext) => (
            <form onSubmit={authContext.loginUser}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
          )}
        </AuthContext.Consumer>
        <Link to="/register">Click here to register</Link>
      </div>
    );
  }
}

export default LoginForm;
