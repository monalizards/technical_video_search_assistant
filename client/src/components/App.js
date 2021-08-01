import "./App.css";

import { useState, useEffect } from "react";
import { VideoProvider } from "./VideoContext";
import { HistoryProvider } from "./HistoryContext";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";

import Navbar from "./Navbar";
import VideoSearchBar from "./VideoSearchBar";
import VideoShow from "./VideoShow";

export default function App() {
  const [darkmode, setDarkmode] = useState(true);

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("darkmode")) === false) {
      setDarkmode(false);
    }
  }, []);

  const toggleDarkmode = () => {
    setDarkmode((darkmode) => {
      window.localStorage.setItem("darkmode", !darkmode);
      return !darkmode;
    });
  };

  // Material UI theme styling
  const theme = createTheme({
    palette: {
      type: darkmode ? "dark" : "light",
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
      fontFamily: ["Roboto", "sans-serif"].join(","),
    },
    overrides: {
      MuiFormHelperText: {
        root: {
          fontSize: "0.9em",
        },
      },
      MuiSvgIcon: {
        root: {
          display: "block",
        },
      },
    },
  });

  return (
    <div className={`body ${darkmode ? "dark" : "light"}`}>
      {/* set up Material-UI Themes & css */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Navbar */}
        <Navbar toggleDarkmode={toggleDarkmode} />
        {/* Main content */}
        <VideoProvider>
          <HistoryProvider>
            <main>
              {/* 1. Video Search Bar */}
              <Container>
                <div className="margin-bottom-sm">
                  <VideoSearchBar />
                </div>
                {/* 2. All video-related things */}
                <VideoShow />
              </Container>
            </main>
          </HistoryProvider>
        </VideoProvider>
      </ThemeProvider>
    </div>
  );
}
