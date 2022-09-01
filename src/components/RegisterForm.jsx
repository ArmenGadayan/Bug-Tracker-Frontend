import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import AuthContext from "../context/AuthContext";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
    },
    errors: {},
  };

  static contextType = AuthContext;

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(8).required().label("Password"),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <AuthContext.Consumer>
          {(authContext) => (
            <form onSubmit={authContext.registerUser}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("email", "Email")}
              {this.renderInput("first_name", "First Name")}
              {this.renderInput("last_name", "Last Name")}
              {this.renderButton("Register")}
            </form>
          )}
        </AuthContext.Consumer>
      </div>
    );
  }
}

export default RegisterForm;
