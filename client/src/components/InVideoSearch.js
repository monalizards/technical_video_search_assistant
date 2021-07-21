import { useState } from "react";
import {
  CircularProgress,
  Paper,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import server from "../apis/server";
import "./InVideoSearch.css";
import { useVideo } from "./VideoContext";
import { useHistory } from "./HistoryContext";
import SearchLog from "./SearchLog";

const searchTypes = {
  search: "search",
  qa: "qa",
};

const InVideoSearch = () => {
  const { video } = useVideo();
  const { addHistory } = useHistory();
  const [request, setRequest] = useState({
    type: searchTypes.search,
    content: "",
  });

  const formatParams = () => {
    if (request.type === searchTypes.search) {
      return {
        query: request.content,
        text: video.caption_fulltext,
        sections: video.caption_sections,
      };
    } else {
      return {
        question: request.content,
        text: video.caption_fulltext,
      };
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

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

  const onInputChange = (e) => {
    setRequest({
      ...request,
      content: e.target.value,
    });
  };

  // handle form submission
  const onFormSubmit = (e) => {
    setError("");
    setProgress("");
    e.preventDefault();
    if (request.content.trim() === "") {
      setError("Please enter your query");
      return;
    }
    // console.log(request);
    const params = formatParams();
    // console.log(params);
    setLoading(true);
    // TODO: calculate estimated progress
    // display progress text for qa requests
    if (request.type === searchTypes.qa) {
      setProgress(25);
    } else if (request.type === searchTypes.search) {
      setProgress(75);
    }

    server
      .post(`/${request.type}`, params)
      .then(({ data }) => {
        addHistory({ request, response: data });
      })
      .catch((e) => setError(e.message))
      .finally(() => {
        setLoading(false);
        setProgress(0);
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
          <SearchLog />
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
                  <Grid item>Keyword/Phase</Grid>
                  <Grid item>
                    <Switch
                      disabled={loading}
                      checked={request.type === searchTypes.qa}
                      onChange={onSwitchChange}
                      name="type"
                    />
                  </Grid>
                  <Grid item>Q.A.</Grid>
                  <CircularProgress
                    color="secondary"
                    size="1em"
                    variant="determinate"
                    value={loading ? 25 : 0}
                  />
                </Grid>
              </Typography>
              <TextField
                disabled={loading}
                error={error !== ""}
                helperText={
                  error || progress === 0
                    ? ""
                    : `Approximate progress: ${progress}%`
                }
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
