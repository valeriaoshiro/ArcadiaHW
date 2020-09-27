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
      <h1>Edit Contact</h1>
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={onChange}
            value={form.name}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            onChange={onChange}
            value={form.email}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            onChange={onChange}
            value={form.phone}
          />
        </label>
        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
    </div>
  );
};

export default EditContact;
