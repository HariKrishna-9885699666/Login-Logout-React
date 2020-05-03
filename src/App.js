import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import { FaUser, FaMobile, FaAt, FaBoxOpen } from "react-icons/fa";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LogIn from "./components/Login/LogIn";
import DashBoard from "./components/DashBoard/DashBoard";
import Register from "./components/Register/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import Page404 from "./components/Page404/Page404";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/register" exact component={Register} />
          <ProtectedRoute exact path="/dashboard" component={DashBoard} />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
      <div className="bottom-right">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
        >
          About
        </button>
      </div>

      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">About App</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div id="accordion">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <FaUser className="mr-3" />
                        About Me
                      </button>
                    </h5>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <FaUser className="mr-3" />
                          Hari Krihna Anem
                        </li>
                        <li className="list-group-item">
                          <FaMobile className="mr-3" />
                          +91 9885699666
                        </li>
                        <li className="list-group-item">
                          <FaAt className="mr-3" />
                          anemharikrishna@gmail.com
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card mt-2">
                  <div className="card-header" id="headingTwo">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        <FaBoxOpen className="mr-3" />
                        Packages Used
                      </button>
                    </h5>
                  </div>

                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <FaBoxOpen className="mr-3" />
                          BootStrap
                        </li>
                        <li className="list-group-item">
                          <FaBoxOpen className="mr-3" />
                          Formik
                        </li>
                        <li className="list-group-item">
                          <FaBoxOpen className="mr-3" />
                          Lodash
                        </li>
                        <li className="list-group-item">
                          <FaBoxOpen className="mr-3" />
                          Sweet Alert
                        </li>
                        <li className="list-group-item">
                          <FaBoxOpen className="mr-3" />
                          React Toasts
                        </li>
                        <li className="list-group-item">
                          <FaBoxOpen className="mr-3" />
                          React Native Base s64
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
