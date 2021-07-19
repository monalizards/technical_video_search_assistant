import React, { useContext, useState } from "react";

const HistoryContext = React.createContext();
const HistoryUpdateContext = React.createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addHistory = (req, res) => {
    setHistory(history.add({ req, res }));
  };

  return (
    <HistoryContext.Provider value={history}>
      <HistoryUpdateContext.Provider value={addHistory}>
        {children}
      </HistoryUpdateContext.Provider>
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  return useContext(HistoryContext);
};

export const useHistoryUpdate = () => {
  return useContext(HistoryUpdateContext);
};
