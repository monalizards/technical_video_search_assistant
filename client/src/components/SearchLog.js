import { useEffect } from "react";
import { useHistory } from "./HistoryContext";
import "./SearchLog.css";

const capitalizeFirstLetter = (string) => {
  return `${string[0].toUpperCase()}${string.substring(1)}`;
};
const styleSearchResponseHeader = (query, correction) => {
  if (correction !== null) {
    return `No results found, showing results for: ${correction}`;
  }
  return `Showing matches for: ${query}`;
};

const styleSearchResponse = (query, result) => {
  const header = styleSearchResponseHeader(query, result.correction);
  return (
    <>
      <div className="search-response-header">{header}</div>
      {JSON.stringify(result)}
    </>
  );
};

const formatSearchLog = (log) => {
  const request = (
    <div className="request-box search-request-box">
      Search: "{log.request.content}"
    </div>
  );

  const response = (
    <div className="response-box search-response-box">
      {styleSearchResponse(log.request.content, log.response.results)}
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

const SearchLog = () => {
  const { history } = useHistory();

  const renderHistory = () => {
    let content = null;
    return (
      <ul>
        {history.map((log, index) => {
          if (log.request.type === "search") {
            content = formatSearchLog(log);
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
