import React from "react";
import "./App.css";
import LogIn from "./components/Login/LogIn";
import DashBoard from "./components/DashBoard/DashBoard";
import Register from "./components/Register/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LogIn} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoute exact path="/dashboard" component={DashBoard} />
        <Route path="*" component={() => "404 Not Found"} />
      </Switch>
    </Router>
  );
}

export default App;
