import "./VideoShow.css";

import { useRef } from "react";
import { useVideo } from "./VideoContext";

import { Typography } from "@material-ui/core";

import VideoPlayer from "./VideoPlayer";
import Caption from "./Caption";

const VideoShow = () => {
  const { video } = useVideo();

  const playerRef = useRef();
  const tableRef = useRef();

  if (video) {
    return (
      <div>
        <Typography variant="h5">{video.title}</Typography>
        <VideoPlayer ref={playerRef} tableRef={tableRef} />
        <Caption tableRef={tableRef} playerRef={playerRef} />
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
        // gap: "4em",
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
