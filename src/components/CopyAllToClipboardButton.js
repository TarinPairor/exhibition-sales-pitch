import React from "react";

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
      </button>
    </div>
  );
}

export default CopyAllToClipboardButton;
