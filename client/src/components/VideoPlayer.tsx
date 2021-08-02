import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from "react";
import ReactPlayer from "react-player/youtube";

import { useVideo } from "./VideoContext";

// TODO: fix player type and table ref types of any

const VideoPlayer = forwardRef(({ tableRef }: { tableRef: any }, ref) => {
  const playerRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const { video, setPlayedSeconds } = useVideo();

  const videoPlay = () => {
    setPlaying(true);
  };

  const videoStop = () => {
    setPlaying(false);
  };

  const videoPlaySeconds = (seconds: number) => {
    videoStop();
    playerRef?.current?.player.seekTo(seconds, "seconds");

    // Solve seekto when video isn't loaded
    if (playerRef?.current?.getSecondsLoaded() === 0) {
      setTimeout(
        () => playerRef?.current?.player.seekTo(seconds, "seconds"),
        500
      );
    }
    videoPlay();
    if (tableRef.current) {
      tableRef.current.scrollToSeconds(seconds);
    }
  };

  const getCurrentTime = () => {
    const timestamp = playerRef?.current?.getCurrentTime();
    return timestamp;
  };

  useImperativeHandle(ref, () => ({ videoPlaySeconds, getCurrentTime }));

  const scrollToSeconds = (seconds: number) => {
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
