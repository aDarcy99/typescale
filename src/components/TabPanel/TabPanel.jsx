import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";
//components
import { Typography, Box } from "@material-ui/core";

const TabPanel = (props) => {
  const { children, value, index, id, ...other } = props;
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.grey[50]}
      role="tabpanel"
      hidden={value !== index}
      id={`${id || "code"}-tabpanel-${index}`}
      aria-labelledby={`${id || "code"}-tab-${index}`}
      {...other}
    >
      {value === index ? <Box p={2}>{children}</Box> : ""}
    </Box>
  );
};

export default TabPanel;

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
