import "./VideoShow.css";
import server from "../apis/server";

import { useState, useRef } from "react";

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

  const getCurrentTime = () => {
    const timestamp = playerRef.current.getCurrentTime();
    return timestamp;
  };

  if (Object.keys(videoResult).length !== 0 && videoResult.status === 200) {
    return (
      <div>
        {/* <button onClick={() => seekToPlay(5)}>Jump to 5sec</button> */}
        <button onClick={() => console.log(getCurrentTime())}>
          console log current timestamp
        </button>
        <Typography variant="h5">{videoResult.videoTitle}</Typography>
        <div style={{ margin: "1em auto" }} className="player-wrapper">
          <ReactPlayer
            ref={playerRef}
            playing={playing}
            className="react-player"
            controls={true}
            onPlay={videoPlay}
            onPause={videoStop}
            onEnded={videoStop}
            onError={videoStop}
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${videoResult.videoId}`}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <InVideoSearch onSubmit={onFormSubmit} />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <TranscriptTable
            seekToPlay={seekToPlay}
            captionSections={videoResult.caption_sections}
          />
        </div>
      </div>
    );
  }
  return <Typography variant="h5">No video yet</Typography>;
};

export default VideoShow;
