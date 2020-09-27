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
    case "ADD_CONTACT":
      return {
        contacts: [...state.contacts, action.payload],
      };
    case "EDIT_CONTACT":
      const updatedContact = action.payload;

      let updatedContacts = state.contacts.map((contact) => {
        if (contact.id === updatedContact.id) return updatedContact;
        return contact;
      });

      return {
        contacts: updatedContacts,
      };
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

  //Actions
  const removeContact = (id) => {
    fetch(`http://localhost:3001/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
    dispatch({
      type: "EDIT_CONTACT",
      payload: contact,
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
