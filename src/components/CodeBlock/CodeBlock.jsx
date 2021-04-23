import React from "react";
import PropTypes from "prop-types";
//components
import { Typography, Tabs, Tab, AppBar, Box } from "@material-ui/core";
import TabPanel from "../TabPanel/TabPanel";

function idProps(id, index) {
  return {
    id: `${id || "code"}-tab-${index}`,
    "aria-controls": `${id || "code"}-tabpanel-${index}`,
  };
}

const CodeBlock = (props) => {
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
      <TabPanel value={value} index={0}>
        <pre>
          {props.content[0]}
        </pre>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <pre>
          {props.content[1]}
        </pre>
      </TabPanel>
    </div>
  );
};

export default CodeBlock;
