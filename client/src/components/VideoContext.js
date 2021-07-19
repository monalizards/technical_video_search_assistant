import { createContext, useState, useContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [video, setVideo] = useState({});

  const updatePlayedSeconds = (playedSeconds) => {
    setVideo({ ...video, playedSeconds });
  };

  return (
    <VideoContext.Provider value={{ video, setVideo, updatePlayedSeconds }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  return useContext(VideoContext);
};
