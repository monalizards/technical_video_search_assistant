import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import React from "react";

import { Brightness4, FastForward, GitHub, LinkedIn } from "@material-ui/icons";

import "./Navbar.css";

// links for menu bar icons
const links = {
  github: "https://github.com/monalizards/technical_video_search_assistant",
  linkedIn: "https://www.linkedin.com/in/mona-chung/",
};

const tooltips = {
  theme: "Toggle light/dark mode",
  github: "Visit project repo on Github",
  linkedIn: "Visit my profile on LinkedIn",
};

export default function Navbar({
  toggleDarkmode,
}: {
  toggleDarkmode: () => void;
}) {
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
          <Tooltip title={tooltips.theme}>
            <IconButton onClick={toggleDarkmode} aria-label={tooltips.theme}>
              <Brightness4 />
            </IconButton>
          </Tooltip>
          <Tooltip title={tooltips.github}>
            <IconButton aria-label={tooltips.github}>
              <Link href={links.github} target="_blank" color="inherit">
                <GitHub fontSize="small" />
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title={tooltips.linkedIn}>
            <IconButton aria-label={tooltips.linkedIn}>
              <Link href={links.linkedIn} target="_blank" color="inherit">
                <LinkedIn fontSize="small" />
              </Link>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
