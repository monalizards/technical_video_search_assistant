import React from "react";
import VideoSearchBar from "./VideoSearchBar";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  AppBar,
  CssBaseline,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { FastForward } from "@material-ui/icons";

// Material UI styling

const theme = createTheme({
  palette: {
    type: "dark",
  },
  typography: {
    h4: {
      fontFamily: ["Open Sans Condensed", "sans-serif"].join(","),
      fontWeight: "700",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  navHeader: {
    marginLeft: "2em",
  },
}));

// receive data from VideoSearchBar
const onReceive = (data) => {
  console.log(data);
};

export default function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* set up Material-UI Themes & css */}
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Navbar */}
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <FastForward fontSize="large" />
            <Typography variant="h4" className={classes.navHeader}>
              Technical Video Search Assistant
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main content */}
        <Container style={{ margin: "2em auto" }}>
          <VideoSearchBar onReceive={onReceive} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
