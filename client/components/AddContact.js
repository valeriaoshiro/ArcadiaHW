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
      <h1>Add Contact</h1>
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={onChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" onChange={onChange} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" onChange={onChange} />
        </label>
        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
    </div>
  );
};

export default AddContact;
