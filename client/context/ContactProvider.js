import React, { useReducer, useState, useEffect } from "react";
import ContactContext from "./ContactContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_VALUE":
      return { contacts: [...action.payload] };
    case "REMOVE_CONTACT":
      return {
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  //Actions
  const removeContact = (id) => {
    dispatch({
      type: "REMOVE_CONTACT",
      payload: id,
    });
  };

  useEffect(() => {
    const getContacts = async () => {
      const response = await fetch("http://localhost:3001/contacts");
      let data = await response.json();
      dispatch({ type: "INITIAL_VALUE", payload: data });
    };
    getContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{ contacts: state.contacts, removeContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};
