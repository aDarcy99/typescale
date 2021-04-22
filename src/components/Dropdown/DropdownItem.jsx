import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
//components
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dropdownItem: {
    width: "100%",
    padding: `${theme.spacing(1)}px`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
    },
  },
}));

const DropdownItem = (props, ref) => {
  const classes = useStyles();
  const dropdownRef = ref;

  function onBlur(Event) {
    if (dropdownRef && dropdownRef.current.contains(Event.relatedTarget)) {
      props.onBlur();
    }
  }
  return (
    <Box
      onBlur={onBlur}
      {...props}
      className={`${classes.dropdownItem} ${props.className || ""}`}
    >
      {props.children}
    </Box>
  );
};

export default React.forwardRef(DropdownItem);
