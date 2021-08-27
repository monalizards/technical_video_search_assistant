import { useState } from "react";
import {
  CircularProgress,
  Paper,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import PropTypes from "prop-types";
import server from "../apis/server";
import "./InVideoSearch.css";
import { useVideo } from "./VideoContext";
import { useHistory } from "./HistoryContext";
import SearchLog from "./SearchLog";

const searchTypes = {
  search: "search",
  qa: "qa",
};

// ref: https://material-ui.com/components/progress/
function CircularProgressWithLabel(props) {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display={props.value === 0 ? "none" : "flex"}
      style={{ gap: "0.2em" }}
    >
      <CircularProgress variant="determinate" {...props} />

      <Typography
        variant="caption"
        component="div"
        color="textSecondary"
      >{`${Math.round(props.value)}%`}</Typography>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const InVideoSearch = ({ playerRef }) => {
  const { captions, video } = useVideo();
  const { addHistory } = useHistory();
  const [request, setRequest] = useState({
    type: searchTypes.search,
    content: "",
  });

  const formatParams = () => {
    if (request.type === searchTypes.search) {
      return {
        query: request.content,
        captions: JSON.stringify(captions),
      };
    } else {
      return {
        question: request.content,
        captions: JSON.stringify(captions),
      };
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);

  const setTimer = () => {
    const timerId = setInterval(() => setTimeElapsed((time) => time + 1), 1000);
    return timerId;
  };

  // handle form changes
  const onSwitchChange = (e) => {
    setRequest({
      ...request,
      type:
        request.type === searchTypes.search
          ? searchTypes.qa
          : searchTypes.search,
    });
  };

  // calculate progress
  const calculateProgress = (time) => {
    const duration = video.duration;
    const progress = (time / ((duration / 60) * 10)) * 100;
    return progress > 100 ? 99 : progress;
  };

  const onInputChange = (e) => {
    setRequest({
      ...request,
      content: e.target.value,
    });
  };

  // handle form submission
  const onFormSubmit = (e) => {
    setError("");
    setTimeElapsed(0);
    e.preventDefault();
    if (request.content.trim() === "") {
      setError("Please enter your query");
      return;
    }
    // console.log(request);
    const params = formatParams();
    setLoading(true);
    const timerId = setTimer();

    server
      .post(`/${request.type}`, params)
      .then(({ data }) => {
        // console.log(request, data);
        addHistory({ request, response: data });
        setError("");
      })
      .catch((e) => {
        // ask user to try using search if video is too long for using qa models
        if ((request.type === searchTypes.qa) & (video.duration > 600)) {
          setError(
            "Video length exceeds the limit for this function, please try 'Search' instead."
          );
        } else {
          setError(e.message);
        }
      })
      .finally(() => {
        setLoading(false);
        clearInterval(timerId);
        setTimeElapsed(0);
      });
    setRequest({ ...request, content: "" });
  };

  return (
    <Paper>
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <h6>Search history</h6>
        </div>
        {/* History */}
        <div className="card-content">
          <SearchLog playerRef={playerRef} />
        </div>
        {/* Searchbar */}
        <div className="card-actions">
          <form
            onSubmit={onFormSubmit}
            style={{ display: "inline", width: "100%" }}
          >
            <FormGroup className="form-group">
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>Search</Grid>
                  <Grid item>
                    <Switch
                      disabled={loading}
                      color="primary"
                      checked={request.type === searchTypes.qa}
                      onChange={onSwitchChange}
                      name="type"
                    />
                  </Grid>
                  <Grid item>Q.A.</Grid>
                  <div className="progress">
                    <CircularProgressWithLabel
                      color="secondary"
                      size="1em"
                      variant="determinate"
                      value={loading ? calculateProgress(timeElapsed) : 0}
                    />
                  </div>
                </Grid>
              </Typography>
              <TextField
                disabled={loading}
                error={error !== ""}
                helperText={error}
                variant="filled"
                size="small"
                value={request.content}
                onChange={onInputChange}
                className="input-no-padding"
              />
            </FormGroup>
          </form>
        </div>
      </div>
    </Paper>
  );
};

export default InVideoSearch;
