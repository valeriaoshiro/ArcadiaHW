import React, { useContext, useState } from "react";
import ContactContext from "./../context/ContactContext";
import { useHistory, Link } from "react-router-dom";

const AddContact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { addContact } = useContext(ContactContext);
  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const newContact = {
      name: form.name,
      email: form.email,
      phone: form.phone,
    };
    addContact(newContact);
    history.push("/");
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            className="form-control"
            id="email"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            name="phone"
            className="form-control"
            id="phone"
            onChange={onChange}
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

export default AddContact;
