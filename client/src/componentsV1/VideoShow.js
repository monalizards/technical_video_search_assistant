import "./VideoShow.css";

import { useRef, useEffect } from "react";
import { useVideo } from "./VideoContext";

import { Typography } from "@material-ui/core";
import TranscriptTable from "./TranscriptTable";
import VideoPlayer from "./VideoPlayer";
import InVideoSearch from "./InVideoSearch";
import server from "../apis/server";

const VideoShow = () => {
  const { video } = useVideo();

  // load caption when video info is received
  useEffect(() => {
    console.log(video);
    // server
    //   .post("youtubedl", url)
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch()
    //   .finally();
  }, [video.url]);

  const playerRef = useRef();
  const tableRef = useRef();

  // if (video && video.status === 200) {
  if (video) {
    return (
      <div>
        <Typography variant="h5">{video.videoTitle}</Typography>
        <VideoPlayer ref={playerRef} tableRef={tableRef} />
        {/* <div className="flex-container">
          <div className="table">
            <TranscriptTable ref={tableRef} playerRef={playerRef} />
          </div>
          <div className="history">
            <InVideoSearch playerRef={playerRef} />
          </div>
        </div> */}
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
      <Typography variant="body1">
        Nothing here yet, please check if you have entered a valid URL.
      </Typography>
      <Typography variant="body2">
        Note: If HTTP Error persists, the APIs might be unavailable / rate
        limited.
      </Typography>
    </div>
  );
};

export default VideoShow;
