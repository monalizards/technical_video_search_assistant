import "./App.css";

import React from "react";
import { VideoProvider } from "./VideoContext";
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
      marginBottom: "1rem",
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
        <VideoProvider>
          <Container>
            <div className={classes.bottomMargin}>
              <VideoSearchBar />
            </div>
            {/* 2. All video-related things */}
            <VideoShow />
          </Container>
        </VideoProvider>
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
