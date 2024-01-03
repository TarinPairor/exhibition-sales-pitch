import React from "react";
import "./CopyToClipboardButton.css";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

function CopyToClipboardButton({ text }) {
  return (
    <div className="copy-to-clipboard-button">
      <button
        onClick={() => {
          navigator.clipboard.writeText(text);
        }}
      >
        Copy to Clipboard
        <ContentPasteIcon></ContentPasteIcon>
      </button>
    </div>
  );
}

export default CopyToClipboardButton;
