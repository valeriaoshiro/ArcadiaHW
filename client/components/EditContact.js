import React, { useContext, useState, useEffect } from "react";
import ContactContext from "./../context/ContactContext";
import { useHistory, Link } from "react-router-dom";

const EditContact = (props) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  const { contacts, editContact } = useContext(ContactContext);
  const contactId = props.match.params.id;
  const history = useHistory();

  useEffect(() => {
    const currentContact = contacts.find((contact) => contact.id === contactId);
    setForm(currentContact);
  }, [contactId, contacts]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    editContact(form);
    history.push("/");
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            onChange={onChange}
            value={form.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            className="form-control"
            id="email"
            onChange={onChange}
            value={form.email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            id="phone"
            onChange={onChange}
            value={form.phone}
            required
          />
        </div>
        <button type="submit" className="btn btn-outline-dark mt-3">
          Submit
        </button>
        <Link to="/" className="btn btn-outline-danger mt-3 ml-3">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default EditContact;
