import React from "react";
import { Redirect } from "react-router-dom";
import "./DashBoard.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const _ = require("lodash");

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.name,
      board: [],
      boardItem: "",
      toggle: false,
      submit: true,
      change: true,
      loggedInUserObj: {},
    };
  }

  onLogoutYes = () => {
    this.setState({ submit: false });
    this.setState({ toggle: true });
    const userObj = JSON.parse(
      localStorage.getItem(_.get(this.state.loggedInUserObj, "userName", ""))
    );
    userObj.isUserLoggedIn = false;
    localStorage.setItem(
      _.get(this.state.loggedInUserObj, "userName", ""),
      JSON.stringify(userObj)
    );
  };

  onLogout = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.onLogoutYes(),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  componentDidMount() {
    const loggedInUserName = _.get(this.props.location, "state.userName", {});
    this.setState({
      loggedInUserObj: JSON.parse(localStorage.getItem(loggedInUserName)),
    });
  }

  render() {
    const localUname = `${_.get(
      this.state.loggedInUserObj,
      "firstName",
      ""
    )} ${_.get(this.state.loggedInUserObj, "lastName", "")}`;

    return (
      <div>
        <span className="logout">
          <h2>HELLO {localUname}</h2>
        </span>
        <span className="HelloUser">
          <button
            onClick={this.onLogout}
            style={{
              backgroundColor: "61dafb",
              color: "#282c34",
              float: "right",
            }}
            className="LogoutBtn"
          >
            LOGOUT
          </button>
        </span>

        {!this.state.submit ? <Redirect to={`/`} /> : null}
      </div>
    );
  }
}

export default DashBoard;
