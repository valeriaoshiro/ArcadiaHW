import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ContactContext from "./../context/ContactContext";

const Home = () => {
  const { contacts, removeContact } = useContext(ContactContext);

  return (
    <main>
      <Link className="btn btn-outline-dark mb-3" to={"/add"}>
        Add Contact
      </Link>
      <ul className="list-group">
        {contacts &&
          contacts.map((contact) => (
            <li
              key={contact.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <section className="d-flex flex-column">
                <span>Name: {contact.name}</span>
                <span>Email: {contact.email}</span>
                <span>Phone: {contact.phone}</span>
              </section>
              <section>
                <Link
                  className="btn btn-outline-dark mr-2"
                  to={`/edit/${contact.id}`}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeContact(contact.id)}
                >
                  Delete
                </button>
              </section>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default Home;
