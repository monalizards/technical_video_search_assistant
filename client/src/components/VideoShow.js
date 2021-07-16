import "./VideoShow.css";
import server from "../apis/server";

import { useState, useEffect, useRef } from "react";

import ReactPlayer from "react-player/youtube";
import { Typography } from "@material-ui/core";

import TranscriptTable from "./TranscriptTable";
import InVideoSearch from "./InVideoSearch";

const params = (videoResult, searchType, queryContent) => {
  if (searchType === "search") {
    return {
      query: queryContent,
      text: videoResult.caption_fulltext,
      sections: videoResult.caption_sections,
    };
  } else {
    return {
      question: queryContent,
      text: videoResult.caption_fulltext,
    };
  }
};

const VideoShow = ({ videoResult }) => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef();
  const tableRef = useRef();

  // Prevent autoplay when url changes
  useEffect(() => {
    setPlaying(false);
  }, [videoResult]);

  const onFormSubmit = (searchType, queryContent) => {
    // console.log(searchType, queryContent);
    server
      .post(`${searchType}`, params(videoResult, searchType, queryContent))
      .then((res) => console.log(res.data));
  };

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

  if (Object.keys(videoResult).length !== 0 && videoResult.status === 200) {
    return (
      <div>
        <Typography variant="h5">{videoResult.videoTitle}</Typography>
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
                url={`https://www.youtube.com/watch?v=${videoResult.videoId}`}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "1em" }}>
          <InVideoSearch onSubmit={onFormSubmit} />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <TranscriptTable
            ref={tableRef}
            seekToPlay={seekToPlay}
            captionSections={videoResult.caption_sections}
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
