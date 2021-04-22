import React from "react";
//components
import Footer from "../components/Footer/Footer";

const PageLayout = (props) => {
  return (
    <React.Fragment>
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default PageLayout;
