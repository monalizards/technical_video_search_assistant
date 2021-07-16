import { useState } from "react";
import server from "../apis/server";
import { Box, TextField } from "@material-ui/core";
import ClipLoader from "react-spinners/ClipLoader";

const VideoSearchBar = ({ onReceive }) => {
  //   initiate URL state
  const [url, setUrl] = useState("");
  //   Load spinner
  const [loading, setLoading] = useState(false);
  //   fetch video and caption from server
  const onURLSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (url) {
      const fetchVideo = async () => {
        const response = await server.post("", {
          url,
        });
        onReceive(response.data);
        setLoading(false);
      };
      fetchVideo();
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      {/* Ask user for URL */}
      <form onSubmit={onURLSubmit} style={{ display: "inline", width: "100%" }}>
        <TextField
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

      <ClipLoader
        loading={loading}
        color="#0d47a1"
        size="2em"
        style={{ marginLeft: "1em" }}
      />
    </Box>
  );
};

export default VideoSearchBar;
