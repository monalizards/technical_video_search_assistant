import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from "react";
import { useVideo } from "./VideoContext";

import ReactPlayer from "react-player/youtube";

const VideoPlayer = forwardRef(({ tableRef }, ref) => {
  const playerRef = useRef();
  const [playing, setPlaying] = useState(false);
  const { video, setPlayedSeconds } = useVideo();

  const videoPlay = () => {
    setPlaying(true);
  };

  const videoStop = () => {
    setPlaying(false);
  };

  const videoPlaySeconds = (seconds) => {
    videoStop();
    playerRef.current.player.seekTo(seconds, "seconds");

    // Solve seekto when video isn't loaded
    if (playerRef.current.getSecondsLoaded() === 0) {
      setTimeout(
        () => playerRef.current.player.seekTo(seconds, "seconds"),
        500
      );
    }
    videoPlay();
    if (tableRef.current) {
      tableRef.current.scrollToSeconds(seconds);
    }
  };

  const getCurrentTime = () => {
    const timestamp = playerRef.current.getCurrentTime();
    return timestamp;
  };

  useImperativeHandle(ref, () => ({ videoPlaySeconds, getCurrentTime }));

  const scrollToSeconds = (seconds) => {
    if (tableRef.current) {
      tableRef.current.scrollToSeconds(seconds);
    }
  };

  useEffect(() => {
    videoStop();
  }, [video]);

  return (
    <div
      style={{
        maxWidth: "100%",
        maxHeight: 360,
        marginBottom: "2em",
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
            className="react-player"
            controls={true}
            onReady={() => {
              scrollToSeconds(0);
            }}
            onPlay={videoPlay}
            onPause={videoStop}
            onEnded={videoStop}
            onError={videoStop}
            onProgress={({ playedSeconds }) => {
              setPlayedSeconds(playedSeconds);
              scrollToSeconds(playedSeconds);
            }}
            width="100%"
            height="100%"
            style={{
              maxWidth: 640,
              maxHeight: 360,
            }}
            url={`https://www.youtube.com/watch?v=${video.id}`}
            playing={playing}
          />
        </div>
      </div>
    </div>
  );
});

export default VideoPlayer;
