import { useState } from "react";
import server from "../apis/server";
import { TextField } from "@material-ui/core";

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
    <div>
      {/* Ask user for URL */}
      <form onSubmit={onURLSubmit}>
        <TextField
          variant="filled"
          fullWidth
          size="small"
          placeholder="Youtube Video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default VideoSearchBar;
