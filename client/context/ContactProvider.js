import React, { useReducer, useState, useEffect } from "react";
import ContactContext from "./ContactContext";
import { reducer } from "./ProviderHelper";

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

  //Actions
  const removeContact = (id) => {
    fetch(`http://localhost:3001/contacts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        dispatch({
          type: "REMOVE_CONTACT",
          payload: id,
        });
      })
      .catch((error) => {
        throw new Error("Transaction was not successful " + error);
      });
  };

  const addContact = (contact) => {
    fetch("http://localhost:3001/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "ADD_CONTACT",
          payload: data,
        });
      })
      .catch((error) => {
        throw new Error("Transaction was not successful " + error);
      });
  };

  const editContact = (contact) => {
    fetch(`http://localhost:3001/contacts/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "EDIT_CONTACT",
          payload: data,
        });
      })
      .catch((error) => {
        throw new Error("Transaction was not successful " + error);
      });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        removeContact,
        addContact,
        editContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
