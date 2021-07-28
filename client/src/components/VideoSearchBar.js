import { useState } from "react";
import server from "../apis/server";
import { css } from "@emotion/react";
import { Box, TextField } from "@material-ui/core";
import ClipLoader from "react-spinners/ClipLoader";
import { useVideo } from "./VideoContext";
import { useHistory } from "./HistoryContext";

// React spinners css
// ref: https://github.com/davidhu2000/react-spinners
const override = css`
  margin-left: 8px;
`;

const VideoSearchBar = () => {
  // initiate URL state
  const [url, setUrl] = useState("");
  // Load spinner
  const [loading, setLoading] = useState(false);
  // show error
  const [error, setError] = useState("");
  // use video and history context
  const { setVideo, setPlayedSeconds, setCaptions } = useVideo();
  const { clearHistory } = useHistory();

  const clear_screen = () => {
    // clean up previous states
    setError("");
    clearHistory();
    setVideo(null);
    setPlayedSeconds(0);
    setCaptions([]);
  };

  const get_vid_info = (url) => {
    server
      .post("vidinfo", { url })
      .then(({ data }) => {
        const { results } = data;
        if (results.status === 400) {
          setError(
            `${results.message}, please make sure you've entered the complete URL to a YouTube video.`
          );
        } else {
          setVideo({ url, ...results.videoInfo });
        }
      })
      .catch(({ response }) => {
        setError(
          `${response.statusText}, please make sure you've entered a URL.`
        );
        setVideo(null);
      })
      .finally(() => setLoading(false));
  };

  // fetch video info from server
  const onURLSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (url) {
      clear_screen();
      get_vid_info(url);
    } else {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      {/* Ask user for URL */}
      <form onSubmit={onURLSubmit} style={{ width: "100%" }}>
        <TextField
          error={error !== ""}
          helperText={error}
          variant="filled"
          fullWidth
          size="small"
          placeholder="Youtube Video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          className="input-no-padding"
        />
      </form>
      <ClipLoader loading={loading} css={override} color="#26418f" size="2em" />
    </Box>
  );
};

export default VideoSearchBar;
