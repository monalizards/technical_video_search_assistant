import React from "react";
import "./SearchResultButton.css";
import { useVideo } from "./VideoContext";

const buttonSettings = {
  before: {
    prefixClass: "prefix-before",
    prefix: "<<",
  },
  after: {
    prefixClass: "prefix-after",
    prefix: ">>",
  },
};

interface Result {
  section: number;
  text_before: string;
  text_after: string;
  match: string;
}

interface Props {
  currentTime: number;
  result: Result;
  playerRef: any;
}

export const SearchResultButton: React.FC<Props> = ({
  currentTime,
  result,
  playerRef,
}) => {
  const { captions } = useVideo();

  const findSectionTime = (section: number) => {
    //   offset for sections starting at index 1
    const captionSection = captions[section - 1];
    const startTime = parseFloat(captionSection.time.split(":")[0]);
    return startTime;
  };

  const time = findSectionTime(result.section);

  const { prefixClass, prefix } =
    time < currentTime ? buttonSettings.before : buttonSettings.after;

  const onButtonClick = (time: number) => {
    playerRef.current.videoPlaySeconds(time);
  };

  return (
    <div className="btn" onClick={() => onButtonClick(time)}>
      <div>
        {/* << if current time is after the time of the match */}
        <small className={prefixClass}>
          {prefix} {time}
        </small>
      </div>
      <div>
        <span className="text-small">{result.text_before}</span>
        <strong>{result.match}</strong>
        <span className="text-small">{result.text_after}</span>
      </div>
    </div>
  );
};
