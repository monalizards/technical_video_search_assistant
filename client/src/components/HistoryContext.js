import React, { useContext, useState } from "react";

const HistoryContext = React.createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  // add an item in history with the request and response
  const addHistory = (entry) => {
    setHistory([...history, entry]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  return useContext(HistoryContext);
};
