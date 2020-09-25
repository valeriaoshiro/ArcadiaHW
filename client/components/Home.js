import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ContactContext from "./../context/ContactContext";

const Home = () => {
  const contacts = useContext(ContactContext);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} | {contact.phone} | {contact.email}
            <Link to={`/edit/${contact.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
