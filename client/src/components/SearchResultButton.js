import "./SearchResultButton.css";
import { useVideo } from "./VideoContext";

const buttonSettings = {
  before: {
    color: "rgb(132 164 251)",
    prefix: "<<",
  },
  after: {
    color: "rgb(182 255 255)",
    prefix: ">>",
  },
};

export const SearchResultButton = ({ currentTime, result, playerRef }) => {
  const { captions } = useVideo();

  const findSectionTime = (section) => {
    //   offset for sections starting at index 1
    const captionSection = captions[section - 1];
    const startTime = parseFloat(captionSection.time.split(":")[0]);
    return startTime;
  };

  const time = findSectionTime(result.section);

  const { color, prefix } =
    time < currentTime ? buttonSettings.before : buttonSettings.after;

  const onButtonClick = () => {
    playerRef.current.videoPlaySeconds(time);
  };

  return (
    <div className="btn" onClick={() => onButtonClick(time)}>
      <div>
        {/* << if current time is after the time of the match */}
        <small style={{ color: color }}>
          {prefix} {time}
        </small>
      </div>
      <div>
        {/* TODO: match prefix */}
        <strong>{result.match}</strong>
        {/* TODO: match suffix */}
      </div>
    </div>
  );
};
