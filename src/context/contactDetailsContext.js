import React, { createContext, useContext, useState } from "react";
import { v4 } from "uuid";
const ContactDetailsContext = createContext();

export const useContactDetails = () => {
  return useContext(ContactDetailsContext);
};

export const ContactDetailsProvider = ({ children }) => {
  const [contactDetails, setContactDetails] = useState({});
  const [userId, setUserId] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const addContact = (personData) => {
    const uuid = v4();
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [uuid]: personData,
    }));
  };

  return (
    <ContactDetailsContext.Provider
      value={{
        contactDetails,
        addContact,
        userId,
        setUserId,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </ContactDetailsContext.Provider>
  );
};
