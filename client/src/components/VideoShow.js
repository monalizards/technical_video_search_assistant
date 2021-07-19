import "./VideoShow.css";

import { useRef } from "react";
import { useVideo } from "./VideoContext";

import { Typography } from "@material-ui/core";

import TranscriptTable from "./TranscriptTable";
import VideoPlayer from "./VideoPlayer";
import InVideoSearch from "./InVideoSearch";

const VideoShow = () => {
  const { video } = useVideo();

  const playerRef = useRef();
  const tableRef = useRef();

  // const getCurrentTime = () => {
  //   const timestamp = playerRef.current.getCurrentTime();
  //   return timestamp;
  // };

  if (Object.keys(video).length !== 0 && video.status === 200) {
    return (
      <div>
        <Typography variant="h5">{video.videoTitle}</Typography>
        <VideoPlayer ref={playerRef} tableRef={tableRef} />

        <div
          style={{
            marginBottom: "1em",
            height: 400,
            display: "flex",
            gap: "1em",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <TranscriptTable ref={tableRef} playerRef={playerRef} />
          </div>
          <InVideoSearch playerRef={playerRef} />
        </div>
      </div>
    );
  }
  return (
    <Typography variant="h5">
      No video yet, please check if you have entered a valid URL.
    </Typography>
  );
};

export default VideoShow;
