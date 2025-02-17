import React, { createContext, useState, useContext } from "react";

const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  };

  return (
    <TicketsContext.Provider value={{ tickets, addTicket }}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => useContext(TicketsContext);
