import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { connect } from "react-redux";

let withPublicRoot = ComposedComponent => {
  return class PublicRoot extends React.Component {
    render() {
      const { authenticated } = this.props;
      return (
        <React.Fragment>
          <Header isAuthenticated={authenticated} />
          <main className="App-content">
            <ComposedComponent />
          </main>
          <Footer />
        </React.Fragment>
      );
    }
  };
};

export default withPublicRoot;
