import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
//components
import { Typography, Tabs, Tab, AppBar, Box } from "@material-ui/core";
import TabPanel from "../TabPanel/TabPanel";
//styles
const useStyles = makeStyles({
  content: {
    height: "400px",
    overflow: "scroll",
  },
});

const CodeBlock = (props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const onTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={onTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="CSS" {...idProps("code", 0)} />
          <Tab label="JS Object" {...idProps("code", 1)} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.content} value={value} index={0}>
        <Typography component="pre">{props.content[0]}</Typography>
      </TabPanel>
      <TabPanel className={classes.content} value={value} index={1}>
        <Typography component="pre">{props.content[1]}</Typography>
      </TabPanel>
    </div>
  );
};

function idProps(id, index) {
  return {
    id: `${id || "code"}-tab-${index}`,
    "aria-controls": `${id || "code"}-tabpanel-${index}`,
  };
}

export default CodeBlock;
