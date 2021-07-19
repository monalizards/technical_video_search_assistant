import { useState } from "react";
import server from "../apis/server";
import { css } from "@emotion/react";
import { Box, TextField } from "@material-ui/core";
import ClipLoader from "react-spinners/ClipLoader";

// React spinners css
// ref: https://github.com/davidhu2000/react-spinners
const override = css`
  margin-left: 8px;
`;

const VideoSearchBar = ({ onReceive }) => {
  //   initiate URL state
  const [url, setUrl] = useState("");
  //   Load spinner
  const [loading, setLoading] = useState(false);
  // show error
  const [error, setError] = useState("");
  //   fetch video and caption from server
  const onURLSubmit = (e) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    if (url) {
      server
        .post("", {
          url,
        })
        .then((res) => {
          const { results } = res.data;
          if (results.status === 200) {
            onReceive(results);
          } else if (results.status === 400) {
            setError(results.message);
            onReceive({});
          }
          setTimeout(() => {
            setLoading(false);
          }, 50000);
        })
        .catch((err) => {
          setError(err.message);
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
