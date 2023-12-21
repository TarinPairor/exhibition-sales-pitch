import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function LinkButton({ to, text, color }) {
  return (
    <Link to={to}>
      <Button color={color} variant="contained">
        {text}
      </Button>
    </Link>
  );
}

export default LinkButton;
