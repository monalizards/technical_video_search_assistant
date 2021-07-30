import TranscriptTable from "./TranscriptTable";
import InVideoSearch from "./InVideoSearch";
import server from "../apis/server";
import { useEffect, useState, useCallback } from "react";
import { useVideo } from "./VideoContext";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import "./Caption.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const Caption = ({ tableRef, playerRef }) => {
  const classes = useStyles();
  const { url, video, captions, setCaptions } = useVideo();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [error, setError] = useState("");

  const fetchCaption = useCallback(
    (url) => {
      setError("");
      if (video !== null) {
        const intervalId = setInterval(
          () => setTimeElapsed((time) => time + 1),
          1000
        );

        server
          .post("youtubedl", { url })
          .then((res) => {
            const results = res.data.results;
            if (results.status === 200) {
              setCaptions(results.caption);
            } else {
              setError("Unable to generate captions.");
            }
          })
          .catch((err) =>
            setError("Endpoint unavailable. Unable to generate captions.")
          )
          .finally(() => {
            clearInterval(intervalId);
            setTimeElapsed(0);
          });
      }
    },
    [video, setCaptions]
  );

  const calculateProgress = (timeElapsed) => {
    if (timeElapsed < video.duration) {
      return (timeElapsed / video.duration) * 100;
    } else {
      return 99.9;
    }
  };

  useEffect(() => {
    fetchCaption(url);
  }, [url, fetchCaption]);

  if (captions.length !== 0) {
    return (
      <div className="flex-container">
        <div className="table">
          <TranscriptTable ref={tableRef} playerRef={playerRef} />
        </div>
        <div className="history">
          <InVideoSearch playerRef={playerRef} />
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className="flex-container">
        <Typography variant="h6">{error}</Typography>
      </div>
    );
  } else {
    return (
      <div className="flex-container">
        <div className={classes.root}>
          <Typography variant="h6">
            Loading Captions... {calculateProgress(timeElapsed).toFixed(1)}%
            done
          </Typography>
          <LinearProgress
            variant="determinate"
            value={calculateProgress(timeElapsed)}
          />
        </div>
      </div>
    );
  }
};

export default Caption;
