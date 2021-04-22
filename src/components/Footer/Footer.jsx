import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
//components
import Link from "../Link/Link";
import { AppBar, Container, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  return (
    <Container component="footer" maxWidth="xl">
      Footer
    </Container>
  );
};

export default Footer;
