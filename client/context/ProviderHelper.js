export const reducer = (state, action) => {
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
