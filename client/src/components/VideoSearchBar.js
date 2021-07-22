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
  //   initiate URL state
  const [url, setUrl] = useState("");
  //   Load spinner
  const [loading, setLoading] = useState(false);
  // show error
  const [error, setError] = useState("");
  // use video context
  const { setVideo } = useVideo();
  const { clearHistory } = useHistory();

  //   fetch video and caption from server
  const onURLSubmit = (e) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    if (url) {
      clearHistory();
      setVideo(null);
      server
        .post("", {
          url,
        })
        .then((res) => {
          const { results } = res.data;
          if (results.status === 200) {
            setVideo({ ...results, playedSeconds: 0 });
          } else if (results.status === 400) {
            setError(results.message);
            setVideo(null);
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
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
