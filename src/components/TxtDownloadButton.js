import React from "react";

function downloadSalesProposal(
  executiveSummary,
  proposedSolution,
  priceAndBudget
) {
  // Combine the content
  const content = `
Executive Summary:
${executiveSummary}

Proposed Solution:
${proposedSolution}

Price and Budget:
${priceAndBudget}
`;

  // Create a Blob with the text content
  const blob = new Blob([content], { type: "text/plain" });

  // Create a download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  // Set the download attribute and filename
  const currentDate = new Date().toISOString().slice(0, 10);
  link.download = `sales-proposal-${currentDate}.txt`;

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click on the link to start the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}

function TxtDownloadButton({
  executiveSummary,
  proposedSolution,
  priceAndBudget,
}) {
  return (
    <div>
      <button
        onClick={() =>
          downloadSalesProposal(
            executiveSummary,
            proposedSolution,
            priceAndBudget
          )
        }
      >
        Download Sales Proposal as a .txt file
      </button>
    </div>
  );
}

export default TxtDownloadButton;
