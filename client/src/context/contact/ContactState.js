import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "jill@gmail.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Sara watson",
        email: "saragmail.com",
        phone: "111-111-1112",
        type: "personal",
      },
      {
        id: 3,
        name: "JHarry White",
        email: "harry@gmail.com",
        phone: "111-222-1111",
        type: "professional",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };

  // Delete Contact
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };

  //Set Currrent Contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  //Clear Currrent Contact
  const clearCurrent = (contact) => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  //Update Contact
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };

  // Filter Contacts
  const filterContact = (text) => {
    dispatch({
      type: FILTER_CONTACT,
      payload: text,
    });
  };

  // Clear Filter
  const clearFilter = (contact) => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
