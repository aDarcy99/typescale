import React from "react";
//components
import { Typography, Link as MuiLink } from "@material-ui/core";

const Link = (props) => {
  return (
    <Typography
      component={props.component}
      variant={props.variant}
      className={props.className || ""}
    >
      <MuiLink
        color="inherit"
        underline={props.underline || "none"}
        href={props.href}
      >
        {props.children}
      </MuiLink>
    </Typography>
  );
};

export default Link;
