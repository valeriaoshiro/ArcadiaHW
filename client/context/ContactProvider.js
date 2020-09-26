import React, { useReducer, useState, useEffect } from "react";
import ContactContext from "./ContactContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_VALUE":
      return { contacts: [...action.payload] };
    default:
      return state;
  }
};

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    const getContacts = async () => {
      const response = await fetch("http://localhost:3001/contacts");
      let data = await response.json();
      dispatch({ type: "INITIAL_VALUE", payload: data });
    };
    getContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {children}
    </ContactContext.Provider>
  );
};
