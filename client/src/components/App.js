import "./App.css";

import { VideoProvider } from "./VideoContext";
import { HistoryProvider } from "./HistoryContext";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";

import Navbar from "./Navbar";
import VideoSearchBar from "./VideoSearchBar";
import VideoShow from "./VideoShow";

// Material UI theme styling

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

export default function App() {
  return (
    <div className="body">
      {/* set up Material-UI Themes & css */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Navbar */}
        <Navbar />
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
