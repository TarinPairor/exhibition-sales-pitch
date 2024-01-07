import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ImageUpload.css";

function ImageUpload() {
  // State to track the selected files
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Event handler for file input change
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Filter only image files
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    setSelectedFiles((prevFiles) => [...prevFiles, ...imageFiles]);
  };

  // Event handler for deleting an image
  const handleDeleteImage = (index) => {
    setSelectedFiles((prevFiles) => [
      ...prevFiles.slice(0, index),
      ...prevFiles.slice(index + 1),
    ]);
  };

  // Event handler for form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Perform the upload logic here (e.g., send the files to the server)
    if (selectedFiles.length > 0) {
      // Your upload logic goes here
      console.log("Selected Files:", selectedFiles);
    } else {
      console.error("No files selected");
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleFormSubmit}>
          {/* File input for multiple files */}
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            accept="image/*"
          />

          {/* Display selected images with delete option */}
          <div className="images">
            {selectedFiles.map((file, index) => (
              <div key={index} className="image">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected ${index + 1}`}
                  style={{ maxWidth: "100px", marginRight: "10px" }}
                />
                <div className="delete-button">
                  <DeleteIcon onClick={() => handleDeleteImage(index)} />
                </div>
              </div>
            ))}
          </div>
          {/* Submit button */}
          {/*<button type="submit">Upload Images</button>*/}
        </form>
      </div>
    </div>
  );
}

export default ImageUpload;
