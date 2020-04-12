import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import base64 from "react-native-base64";
import { validateName, validatePassword } from "../../validations/validations";

class Register extends React.Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};

            errors.firstName =
              validateName(values.firstName, "First Name") || null;
            errors.lastName =
              validateName(values.lastName, "Last Name") || null;
            errors.userName =
              validateName(values.userName, "User Name") || null;
            errors.password = validatePassword(values.password) || null;

            for (var key in errors) {
              if (errors[key] !== null) return errors;
            }
            return true;
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);

            if (!localStorage.getItem(values.userName)) {
              localStorage.setItem(
                values.userName,
                JSON.stringify({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  userName: values.userName,
                  password: base64.encode(values.password),
                  isUserLoggedIn: false,
                })
              );

              ToastsStore.success("User registered successfully.");
              actions.resetForm();
            } else {
              ToastsStore.error("Username is already exists.");
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div>
                <div className="registercontainer">
                  <h1>Register</h1>
                  <p>Please fill in this form to create an account.</p>
                  <hr />

                  <label>
                    <b>First Name</b>
                    <span className="error">*</span>
                    <span className="errorMsg">
                      {props.errors.firstName &&
                        props.touched.firstName &&
                        props.errors.firstName}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.firstName}
                  />

                  <label>
                    <b>Last Name</b>
                    <span className="error">*</span>
                    <span className="errorMsg">
                      {props.errors.lastName &&
                        props.touched.lastName &&
                        props.errors.lastName}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.lastName}
                  />

                  <label>
                    <b>User Name</b>
                    <span className="error">*</span>
                    <span className="errorMsg">
                      {props.errors.userName &&
                        props.touched.userName &&
                        props.errors.userName}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter User Name"
                    name="userName"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.userName}
                  />

                  <label>
                    <b>Password</b>
                    <span className="error">*</span>
                    <span className="errorMsg">
                      {props.errors.password &&
                        props.touched.password &&
                        props.errors.password}
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Repeat Password"
                    name="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                  />

                  <button
                    type="submit"
                    className="registerbtn"
                    disabled={false}
                  >
                    Register
                  </button>
                </div>
                <div className="signin">
                  <p>
                    Already have an account? <Link to={"/"}>Sign In</Link>
                  </p>
                </div>
              </div>
            </form>
          )}
        </Formik>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
      </div>
    );
  }
}

export default Register;
