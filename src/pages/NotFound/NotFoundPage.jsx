import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./not-found.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>404 Error Page</h1>
      <p className="zoom-area">The current page is not available</p>
      <section className="error-container">
        <span>4</span>
        <span>
          <span className="screen-reader-text">0</span>
        </span>
        <span>4</span>
      </section>
      <div className="link-container">
        <Button
          className="more-link cursor-pointer hover:bg-yellow-50 rounded-lg"
          onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
