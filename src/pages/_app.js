import React from 'react';
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Head from "next/head"

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#fff"
    },
    primary: {
      main: "#6600FF"
    },
    secondary: {
      main: "#FFC919"
    },
    text:{
      primary: "#000",
      secondary: "#071C57"
    }
  },
  typography: {
    fontFamily: "'Hind Madurai', sans-serif",
    fontSize: 18
  },
  overrides: {
    MuiButton:{
      root:{
      }
    },
    MuiCssBaseline: {
      '@global': {
        html: {
          scrollBehavior: "smooth",
        },
      },
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
    </Head>
      <ThemeProvider theme={theme}>
          <CssBaseline /> 
          <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}