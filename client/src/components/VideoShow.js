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

  if (video && video.status === 200) {
    return (
      <div>
        <Typography variant="h5">{video.videoTitle}</Typography>
        <VideoPlayer ref={playerRef} tableRef={tableRef} />
        <div className="flex-container">
          <div className="table">
            <TranscriptTable ref={tableRef} playerRef={playerRef} />
          </div>
          <div className="history">
            <InVideoSearch playerRef={playerRef} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <Typography variant="h5">
      <Typography variant="body1">
        No video yet, please check if you have entered a valid URL.
      </Typography>
      <Typography variant="body2">
        Note: If HTTP Error persists, the APIs might be unavailable / rate
        limited.
      </Typography>
    </Typography>
  );
};

export default VideoShow;
