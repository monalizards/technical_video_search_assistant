import "./VideoShow.css";

import { useRef } from "react";
import { useVideo } from "./VideoContext";

import { Typography } from "@material-ui/core";

import VideoPlayer from "./VideoPlayer";

// import TranscriptTable from "./TranscriptTable";
// import InVideoSearch from "./InVideoSearch";

const VideoShow = () => {
  const { video } = useVideo();

  const playerRef = useRef();
  const tableRef = useRef();

  if (video) {
    return (
      <div>
        <Typography variant="h5">{video.videoTitle}</Typography>
        <VideoPlayer ref={playerRef} tableRef={tableRef} />
        <div className="flex-container">
          <div className="table">
            {/* <TranscriptTable ref={tableRef} playerRef={playerRef} /> */}
          </div>
          <div className="history">
            {/* <InVideoSearch playerRef={playerRef} /> */}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "4em",
      }}
    >
      <Typography variant="body1">Nothing here yet.</Typography>
      {/* <Typography variant="body2">
        Note: If HTTP Error persists, the APIs might be unavailable / rate
        limited.
      </Typography> */}
    </div>
  );
};

export default VideoShow;
