import { createContext, useState, useContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [captions, setCaptions] = useState([]);

  return (
    <VideoContext.Provider
      value={{
        url,
        setUrl,
        video,
        setVideo,
        playedSeconds,
        setPlayedSeconds,
        captions,
        setCaptions,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  return useContext(VideoContext);
};
