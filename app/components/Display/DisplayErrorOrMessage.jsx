import React from "react";

const DisplayErrorOrMessage = ({ error, message }) => {
  const isError = () => {
    return error ? <div className="error">{error}</div> : null;
  };

  const isMessage = () => {
    return message ? <div className="message">{message}</div> : null;
  };

  return (
    <>
      {isError()}
      {isMessage()}
    </>
  );
};

export default DisplayErrorOrMessage;
