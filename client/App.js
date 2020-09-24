import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <header>Contact Management</header>
      <Router>
        <Switch></Switch>
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));
