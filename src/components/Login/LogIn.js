import React from "react";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import { Redirect, Link } from "react-router-dom";
import base64 from "react-native-base64";
import { Formik } from "formik";
import "./Login.css";
import { validateName, validatePassword } from "../../validations/validations";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
    };
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            userName: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};

            errors.userName = validateName(values.userName, "Username") || null;
            errors.password = validatePassword(values.password) || null;

            for (var key in errors) {
              if (errors[key] !== null) return errors;
            }
            return true;
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            let userObj = localStorage.getItem(values.userName);
            if (!userObj) {
              ToastsStore.error("Invalid Username/Password.");
            } else {
              userObj = JSON.parse(userObj);
              const localUname = (userObj && userObj.userName) || null;
              const localUpwd =
                (userObj && base64.decode(userObj.password)) || null;

              if (
                values.userName === localUname &&
                values.password === localUpwd
              ) {
                userObj.isUserLoggedIn = true;
                localStorage.setItem(values.userName, JSON.stringify(userObj));
                this.setState({ submit: true });
              } else {
                ToastsStore.error("Invalid Username/Password.");
              }
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div>
                <header className="App-header">
                  React Signup, Signin, Logout features
                </header>
                <div>
                  <div>
                    <div className="logincontainer">
                      <label>
                        <b>Username</b>
                        <span className="error">*</span>
                        <span className="errorMsg">
                          {props.errors.userName &&
                            props.touched.userName &&
                            props.errors.userName}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="userName"
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
                        className="form-control"
                        placeholder="password"
                        name="password"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                      />

                      <button type="submit">Log In</button>
                      <Link to={"/register"}>Create Account</Link>
                    </div>
                  </div>

                  {localStorage.getItem(props.values.userName) &&
                  JSON.parse(localStorage.getItem(props.values.userName))
                    .isUserLoggedIn ? (
                    <Redirect
                      to={{
                        pathname: "/dashboard",
                        state: { userName: props.values.userName },
                      }}
                    />
                  ) : null}
                </div>
                <ToastsContainer
                  store={ToastsStore}
                  position={ToastsContainerPosition.TOP_RIGHT}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
export default LogIn;
