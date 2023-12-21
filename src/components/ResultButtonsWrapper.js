// ResultButtonsWrapper.js

import React, { useState } from "react";
import CopyToClipboardButton from "./CopyToClipboardButton";
import DownloadButton from "./DownloadButton";
import "./ResultButtonsWrapper.css";
import MenuIcon from "@mui/icons-material/Menu";

const ResultButtonsWrapper = ({
  executiveSummary,
  proposedSolution,
  priceAndBudget,
}) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const toggleDisplay = () => {
    setIsDisplayed(!isDisplayed);
  };

  return (
    <div className={`result-buttons-wrapper ${isDisplayed ? "displayed" : ""}`}>
      <button onClick={toggleDisplay}>
        <MenuIcon />
        <br></br>
        Export Data
      </button>
      {isDisplayed && (
        <>
          <CopyToClipboardButton
            executiveSummary={executiveSummary}
            proposedSolution={proposedSolution}
            priceAndBudget={priceAndBudget}
          />
          <DownloadButton
            executiveSummary={executiveSummary}
            proposedSolution={proposedSolution}
            priceAndBudget={priceAndBudget}
          />
        </>
      )}
    </div>
  );
};

export default ResultButtonsWrapper;
