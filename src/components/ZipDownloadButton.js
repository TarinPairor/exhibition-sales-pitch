import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import ImageModule from "open-docxtemplater-image-module";
import "./ImageUpload.css";

function ZipDownloadButton({
  executiveSummary,
  proposedSolution,
  priceAndBudget,
}) {
  // State to track the selected files
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Event handler for deleting an image
  const handleDeleteImage = (index) => {
    setSelectedFiles((prevFiles) => [
      ...prevFiles.slice(0, index),
      ...prevFiles.slice(index + 1),
    ]);
  };

  const handleDownload = () => {
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
    template.attachModule(
      new ImageModule({ getImage: (tagValue) => tagValue })
    );

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
    link.download = `combined-download-${currentDate}.pptx`;

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <div className="form">
        <ImageUpload
          onFileChange={(files) => setSelectedFiles(files)}
          onDeleteImage={handleDeleteImage}
        />
        <button onClick={handleDownload}>Download Combined Proposal</button>
      </div>
    </div>
  );
}

export default ZipDownloadButton;
