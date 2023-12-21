import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LinkButton from "./LinkButton";
import { useLocation } from "react-router-dom";

export default function ButtonAppBar() {
  const location = useLocation();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <LinkButton
          to={isHome ? "/pitch" : "/"}
          text={isHome ? "Go to Pitch!" : "Go to Proposal!"}
          color="inherit"
        />
      </Toolbar>
    </AppBar>
  );
}
