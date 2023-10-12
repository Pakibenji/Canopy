import React from "react";

const DisplayErrorOrMessage = ({ error, message }) => {
  function isError() {
    error ? <div className="error">{error}</div> : null;
  }

  function isMessage() {
    message ? <div className="message">{message}</div> : null;
  }

  return (
    <>
      {isError()}
      {isMessage()}
    </>
  );
};

export default DisplayErrorOrMessage;
