import { createContext, useState, useContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [video, setVideo] = useState({});

  return (
    <VideoContext.Provider value={{ video, setVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  return useContext(VideoContext);
};
