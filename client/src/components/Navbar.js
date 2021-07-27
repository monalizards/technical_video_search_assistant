import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";

import { FastForward, GitHub, LinkedIn } from "@material-ui/icons";

import "./Navbar.css";

// links for menu bar icons
const links = {
  github: "https://github.com/monalizards/technical_video_search_assistant",
  linkedIn: "https://www.linkedin.com/in/mona-chung/",
};

export default function Navbar() {
  return (
    <nav>
      <AppBar position="static" className="margin-bottom-1">
        <Toolbar variant="dense">
          <Link href="/" color="inherit">
            <FastForward fontSize="large" />
          </Link>
          <Typography variant="h4" className="navHeader">
            Technical Video Search Assistant
          </Typography>
          <IconButton>
            <Link href={links.github} target="_blank" color="inherit">
              <GitHub fontSize="small" />
            </Link>
          </IconButton>
          <IconButton>
            <Link href={links.linkedIn} target="_blank" color="inherit">
              <LinkedIn fontSize="small" />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
