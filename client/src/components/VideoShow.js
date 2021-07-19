import "./VideoShow.css";

import { useState, useEffect, useRef } from "react";
import { useVideo } from "./VideoContext";

import ReactPlayer from "react-player/youtube";
import { Typography } from "@material-ui/core";

import TranscriptTable from "./TranscriptTable";
// import InVideoSearch from "./InVideoSearch";

const params = (video, searchType, queryContent) => {
  if (searchType === "search") {
    return {
      query: queryContent,
      text: video.caption_fulltext,
      sections: video.caption_sections,
    };
  } else {
    return {
      question: queryContent,
      text: video.caption_fulltext,
    };
  }
};

const VideoShow = () => {
  const [playing, setPlaying] = useState(false);

  const { video } = useVideo();

  const playerRef = useRef();
  const tableRef = useRef();

  // Prevent autoplay when url changes
  useEffect(() => {
    setPlaying(false);
  }, [video]);

  // play video to a specific timestamp
  const seekToPlay = (timestamp) => {
    playerRef.current.player.seekTo(timestamp, "seconds");
    setPlaying(true);
  };

  const videoPlay = () => {
    setPlaying(true);
  };

  const videoStop = () => {
    setPlaying(false);
  };

  // const getCurrentTime = () => {
  //   const timestamp = playerRef.current.getCurrentTime();
  //   return timestamp;
  // };

  // Scroll to row
  const onVideoProgress = ({ playedSeconds }) => {
    tableRef.current.scrollToSeconds(playedSeconds);
  };

  if (Object.keys(video).length !== 0 && video.status === 200) {
    return (
      <div>
        <Typography variant="h5">{video.videoTitle}</Typography>
        <div
          style={{
            maxWidth: "100%",
            maxHeight: 360,
          }}
        >
          <div className="player-wrapper">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <ReactPlayer
                ref={playerRef}
                playing={playing}
                className="react-player"
                controls={true}
                onReady={() => {
                  tableRef.current.scrollToSeconds(0);
                }}
                onPlay={videoPlay}
                onPause={videoStop}
                onEnded={videoStop}
                onError={videoStop}
                onProgress={onVideoProgress}
                width="100%"
                height="100%"
                style={{
                  maxWidth: 640,
                  maxHeight: 360,
                }}
                url={`https://www.youtube.com/watch?v=${video.videoId}`}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "1em" }}>{/* <InVideoSearch /> */}</div>

        <div style={{ marginBottom: "1em" }}>
          <TranscriptTable
            ref={tableRef}
            seekToPlay={seekToPlay}
            captionSections={video.caption_sections}
          />
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
