import React from "react";
import ImageUpload from "./ImageUpload";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import ImageModule from "open-docxtemplater-image-module";

function downloadSalesProposalAsWord(
  executiveSummary,
  proposedSolution,
  priceAndBudget,
  selectedFiles // Add a parameter to receive selected image files
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

  // Load the Word template (you need to create a Word template first)
  const template = new Docxtemplater();
  const zip = new PizZip(/* Path to your Word template */);
  template.loadZip(zip);
  template.attachModule(new ImageModule({ getImage: (tagValue) => tagValue }));

  // Set the data for the template
  const data = {
    content,
    images: selectedFiles.map((file) => ({
      src: URL.createObjectURL(file),
      width: 200, // Set the desired width
      height: 200, // Set the desired height
    })),
  };

  // Render the Word document
  template.setData(data);
  template.render();

  // Create a Blob with the rendered content
  const blob = template.getZip().generate({ type: "blob" });

  // Create a download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  // Set the download attribute and filename
  const currentDate = new Date().toISOString().slice(0, 10);
  link.download = `sales-proposal-${currentDate}.docx`;

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click on the link to start the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}

function ZipDownloadButton({
  executiveSummary,
  proposedSolution,
  priceAndBudget,
  selectedFiles, // Add a prop for selected image files
}) {
  return (
    <div>
      <button
        onClick={() =>
          downloadSalesProposalAsWord(
            executiveSummary,
            proposedSolution,
            priceAndBudget,
            selectedFiles
          )
        }
      >
        Download Sales Proposal as Word
      </button>
      <ImageUpload />
    </div>
  );
}

export default ZipDownloadButton;
