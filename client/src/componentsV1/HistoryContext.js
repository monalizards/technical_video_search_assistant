import React, { useContext, useState } from "react";

const HistoryContext = React.createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  // add an item in history with the request and response
  const addHistory = (entry) => {
    setHistory([...history, entry]);
  };

  // reset history array (used when a new video is fetched)
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  return useContext(HistoryContext);
};
