import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import { ContactProvider } from "./context/ContactProvider";

const App = () => {
  return (
    <div className="container">
      <ContactProvider>
        <h1>Contact Management</h1>
        <Router>
          <Switch>
            <Route path="/add" component={AddContact} />
            <Route path="/edit/:id" component={EditContact} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </ContactProvider>
    </div>
  );
};

render(<App />, document.getElementById("root"));
