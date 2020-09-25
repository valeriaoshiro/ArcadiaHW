import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import ContactContext from "./context/ContactContext";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/contacts")
      .then((response) => response.json())
      .then((response) => setContacts(response));
  }, [contacts]);

  return (
    <div>
      <ContactContext.Provider value={contacts}>
        <header>Contact Management</header>
        <Router>
          <Switch>
            <Route path="/add" component={AddContact} />
            <Route path="/edit/:id" component={EditContact} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </ContactContext.Provider>
    </div>
  );
};

render(<App />, document.getElementById("root"));
