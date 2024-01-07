import React, { useState } from "react";
import CopyAllToClipboardButton from "./CopyAllToClipboardButton";
import TxtDownloadButton from "./TxtDownloadButton";
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
          <CopyAllToClipboardButton
            executiveSummary={executiveSummary}
            proposedSolution={proposedSolution}
            priceAndBudget={priceAndBudget}
          />
          <TxtDownloadButton
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
