import "./App.css";

import React from "react";
import { VideoProvider } from "./VideoContext";
import { HistoryProvider } from "./HistoryContext";

import VideoSearchBar from "./VideoSearchBar";
import VideoShow from "./VideoShow";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  AppBar,
  Link,
  CssBaseline,
  Container,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { FastForward, GitHub, LinkedIn } from "@material-ui/icons";

// Material UI styling

const theme = createTheme({
  palette: {
    type: "dark",
  },
  textField: {
    padding: "6px",
  },
  typography: {
    h5: {
      textAlign: "center",
      fontFamily: ["Open Sans Condensed", "sans-serif"].join(","),
      fontWeight: "700",
    },
    h4: {
      fontFamily: ["Open Sans Condensed", "sans-serif"].join(","),
    },
    fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  bottomMargin: {
    marginBottom: "1em",
  },
  smallBottomMargin: {
    marginBottom: "4px",
  },
  navHeader: {
    marginLeft: "1em",
    flexGrow: 1,
  },
}));

const links = {
  github: "https://github.com/monalizards/technical_video_search_assistant",
  linkedIn: "https://www.linkedin.com/in/mona-chung/",
};

// receive data from VideoSearchBar

export default function App() {
  const classes = useStyles();

  return (
    <div className="body">
      {/* set up Material-UI Themes & css */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Navbar */}
        <nav>
          <AppBar position="static" className={classes.bottomMargin}>
            <Toolbar variant="dense">
              <Link href="/" color="inherit">
                <FastForward fontSize="large" />
              </Link>
              <Typography variant="h4" className={classes.navHeader}>
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
        {/* Main content */}
        <main>
          {/* 1. Video Search Bar */}
          <VideoProvider>
            <HistoryProvider>
              <Container>
                <div className={classes.smallBottomMargin}>
                  <VideoSearchBar />
                </div>
                {/* 2. All video-related things */}
                <VideoShow />
              </Container>
            </HistoryProvider>
          </VideoProvider>
        </main>
      </ThemeProvider>
    </div>
  );
}
