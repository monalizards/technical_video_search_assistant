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
  const { video, updatePlayedSeconds } = useVideo();

  const videoPlay = () => {
    setPlaying(true);
  };

  const videoStop = () => {
    setPlaying(false);
  };

  const videoPlaySeconds = (seconds) => {
    videoStop();
    playerRef.current.player.seekTo(seconds, "seconds");
    videoPlay();
  };

  useImperativeHandle(ref, () => ({ playerRef, videoPlaySeconds }));

  //   Prevent autoplay when video source changes
  useEffect(() => {
    videoStop();
  }, [video.videoId]);

  return (
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
            className="react-player"
            controls={true}
            onReady={() => tableRef.current.scrollToSeconds(0)}
            onPlay={videoPlay}
            onPause={videoStop}
            onEnded={videoStop}
            onError={videoStop}
            onProgress={({ playedSeconds }) => {
              updatePlayedSeconds(playedSeconds);
              tableRef.current.scrollToSeconds(playedSeconds);
            }}
            width="100%"
            height="100%"
            style={{
              maxWidth: 640,
              maxHeight: 360,
            }}
            url={`https://www.youtube.com/watch?v=${video.videoId}`}
            playing={playing}
          />
        </div>
      </div>
    </div>
  );
});

export default VideoPlayer;
