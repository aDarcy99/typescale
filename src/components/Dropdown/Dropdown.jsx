import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
//components
import { Box, Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    position: "relative",
  },
  dropdownContent: {
    zIndex: 3,
    position: "absolute",
    minWidth: "10em",
    backgroundColor: "white",
    boxShadow: theme.shadows[1],
  },
}));

const Dropdown = (props, ref) => {
  const classes = useStyles({ open: props.open });
  const dropdownRef = ref || useRef("");

  const open = props.open || false;

  function onDropdownBlur(Event) {
    if (dropdownRef.current.contains(Event.relatedTarget)) {
      props.onBlur();
    }
  }

  function renderDropdown() {
    return open ? (
      <Box
        onBlur={onDropdownBlur}
        className={classes.dropdown}
        ref={dropdownRef}
      >
        <Box className={classes.dropdownContent}>{props.children}</Box>
      </Box>
    ) : (
      ""
    );
  }

  return renderDropdown();
};

export default React.forwardRef(Dropdown);

Dropdown.defaultProps = {
  open: false,
};

Dropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
};
