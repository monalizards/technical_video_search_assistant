import "./App.css";

import React, { useState } from "react";
import VideoSearchBar from "./VideoSearchBar";
import VideoShow from "./VideoShow";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  AppBar,
  // Box,
  CssBaseline,
  Container,
  Toolbar,
  Typography,
  // Link,
} from "@material-ui/core";
import { FastForward } from "@material-ui/icons";

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
  navHeader: {
    marginLeft: "2em",
  },
}));

// receive data from VideoSearchBar

export default function App() {
  const [videoResult, setVideoResult] = useState({});

  const onReceive = (results) => {
    setVideoResult(results);
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      {/* set up Material-UI Themes & css */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Navbar */}
        <AppBar position="sticky" className={classes.bottomMargin}>
          <Toolbar variant="dense">
            <FastForward fontSize="large" />
            <Typography variant="h4" className={classes.navHeader}>
              Technical Video Search Assistant
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Main content */}
        {/* 1. Video Search Bar */}
        <Container>
          <div className={classes.bottomMargin}>
            <VideoSearchBar onReceive={onReceive} />
          </div>
          {/* 2. All video-related things */}
          <VideoShow videoResult={videoResult} />
        </Container>
        {/* 3. Footer */}
        {/* <footer>
          <Box>
            <Container>
              <Link href="/">Email me</Link>
            </Container>
          </Box>
        </footer> */}
      </ThemeProvider>
    </React.Fragment>
  );
}
