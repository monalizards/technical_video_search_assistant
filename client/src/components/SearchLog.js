import { useEffect } from "react";
import { useHistory } from "./HistoryContext";
import "./SearchLog.css";
import React from "react";
import { SearchResultButton } from "./SearchResultButton";

const capitalizeFirstLetter = (string) => {
  return `${string[0].toUpperCase()}${string.substring(1)}`;
};
const styleSearchResponseHeader = (query, correction) => {
  if (correction !== null) {
    return `No results found, showing results for: ${correction}`;
  }
  return `Showing matches for: ${query}`;
};

const styleSearchResponse = (query, result, playerRef) => {
  const renderSearchResults = (results) => {
    const currentTime = playerRef.current.getCurrentTime();

    return results.map((result, index) => {
      return (
        <SearchResultButton
          key={index}
          currentTime={currentTime}
          result={result}
          playerRef={playerRef}
        ></SearchResultButton>
      );
    });
  };

  const header = styleSearchResponseHeader(query, result.correction);
  return (
    <>
      <div className="search-header">{header}</div>
      <div className="search-results">
        {renderSearchResults(result.results)}
      </div>
    </>
  );
};

const formatSearchLog = (log, playerRef) => {
  const request = (
    <div className="request-box search-request-box">
      Search: "{log.request.content}"
    </div>
  );

  const response = (
    <div className="response-box search-response-box">
      {styleSearchResponse(
        log.request.content,
        log.response.results,
        playerRef
      )}
    </div>
  );

  return (
    <>
      {request}
      {response}
    </>
  );
  //   JSON.stringify(log);
};

const formatQALog = (log) => {
  const request = (
    <div className="request-box qa-request-box">
      Question: "{log.request.content}"
    </div>
  );

  const response = (
    <div className="response-box qa-response-box">
      {capitalizeFirstLetter(log.response.results)}
    </div>
  );
  return (
    <>
      {request}
      {response}
    </>
  );
};

const SearchLog = ({ playerRef }) => {
  const { history } = useHistory();

  const renderHistory = () => {
    let content = null;
    return (
      <ul>
        {history.map((log, index) => {
          if (log.request.type === "search") {
            content = formatSearchLog(log, playerRef);
          } else if (log.request.type === "qa") {
            content = formatQALog(log);
          }
          return <li key={index}>{content}</li>;
        })}
      </ul>
    );
  };

  //   scroll to bottom when new entry of log is received
  useEffect(() => {
    const newEntry = document.querySelector(".card-content li:last-of-type");
    if (newEntry) {
      newEntry.scrollIntoView({ smooth: true });
    }
  }, [history]);

  return <>{renderHistory()}</>;
};

export default SearchLog;
