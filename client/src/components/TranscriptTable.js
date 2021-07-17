import { AutoSizer, Column, Table } from "react-virtualized";
import Paper from "@material-ui/core/Paper";
import { intervalToDuration } from "date-fns";

import "./TranscriptTable.css";
import { useState, forwardRef, useImperativeHandle } from "react";

// helper functions to style timestamps
// takes time interval as string, output an object with start time and end time in float
const formatTime = (time) => {
  let [startTime, endTime] = time.split(":");
  [startTime, endTime] = [parseFloat(startTime), parseFloat(endTime)];
  return { startTime, endTime };
};

// takes a float and convert it into HH:MM:SS format
const formatTimestamp = (timestamp) => {
  let duration = intervalToDuration({ start: 0, end: timestamp * 1000 });
  for (let key in duration) {
    duration[key] = duration[key].toString().padStart(2, "0");
  }
  return `${duration.hours}:${duration.minutes}:${duration.seconds}`;
};

// takes time from video result and output a string in with start - end interval in HH:MM:SS - HH:MM:SS format
const formatTableTime = (time) => {
  let timestamps = formatTime(time);
  for (let key in timestamps) {
    timestamps[key] = formatTimestamp(timestamps[key]);
  }
  return `${timestamps.startTime}`;
};

const TranscriptTable = forwardRef(({ seekToPlay, captionSections }, ref) => {
  // format sections with useful information to display
  let sections = JSON.parse(captionSections);
  sections = sections.map((section) => {
    return {
      section: parseInt(section.section),
      ...section,
      ...formatTime(section.time),
      timeString: formatTableTime(section.time),
    };
  });

  const [selectedId, setSelectedId] = useState(0);

  // find section from playedSeconds
  const findSection = (playedSeconds) => {
    const id = sections.reduce(
      (acc, section) => (playedSeconds >= section.startTime ? acc + 1 : acc),
      -1
    );
    return id < 0 ? 0 : id;
  };

  const scrollToSeconds = (playedSeconds) => {
    const id = findSection(playedSeconds);
    setSelectedId(id);
  };

  useImperativeHandle(ref, () => ({
    scrollToSeconds,
  }));

  const renderTable = () => {
    return (
      <Paper style={{ width: "100%", height: 300 }}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <Table
                scrollToAlignment="center"
                scrollToIndex={selectedId}
                width={width}
                height={height}
                headerHeight={40}
                rowHeight={40}
                rowCount={sections.length}
                rowGetter={({ index }) => sections[index]}
                rowStyle={({ index }) => {
                  if (index === selectedId) {
                    return {
                      backgroundColor: "#757575",
                    };
                  } else {
                    return {};
                  }
                }}
                onRowClick={({ rowData }) => seekToPlay(rowData.startTime)}
              >
                <Column dataKey="timeString" label="Time" width={100} />
                <Column
                  dataKey="subtitle"
                  label="Transcript"
                  width={200}
                  flexGrow={1}
                />
              </Table>
            );
          }}
        </AutoSizer>
      </Paper>
    );
  };

  return <div>{renderTable(sections, seekToPlay)}</div>;
});

export default TranscriptTable;
