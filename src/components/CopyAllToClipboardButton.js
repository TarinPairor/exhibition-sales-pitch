import React from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

function CopyAllToClipboardButton({
  executiveSummary,
  proposedSolution,
  priceAndBudget,
}) {
  return (
    <div className="copy-to-clipboard-button">
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            `
Executive Summary:
${executiveSummary}

Proposed Solution:
${proposedSolution}

Price and Budget:
${priceAndBudget}
`
          );
        }}
      >
        Copy to Clipboard
        <ContentPasteIcon></ContentPasteIcon>
      </button>
    </div>
  );
}

export default CopyAllToClipboardButton;
