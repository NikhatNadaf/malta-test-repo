import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export const useAddress = () => {
  return useContext(AddressContext);
};

export const AddressProvider = ({ children }) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addLine1, setAddLine1] = useState("");
  const [addLine2, setAddLine2] = useState("");
  const [add_note, setAddNote] = useState("");
  return (
    <AddressContext.Provider
      value={{
        pickupLocation,
        setPickupLocation,
        city,
        setCity,
        state,
        setState,
        postalCode,
        setPostalCode,
        addLine1,
        setAddLine1,
        addLine2,
        setAddLine2,
        add_note,
        setAddNote,
        pickupTime,
        setPickupTime,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
