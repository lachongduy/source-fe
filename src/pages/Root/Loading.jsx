import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import "./loading.scss";
const Loading = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.roots }),
    shallowEqual
  );
  const { isLoading } = currentState;
  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="dot-pulse"></div>
        </div>
      )}
    </>
  );
};

export default Loading;
