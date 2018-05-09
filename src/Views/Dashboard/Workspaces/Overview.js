import React from "react";
import { css, withStyles } from "../../../withStyles";
import FlexContainer from "../../../Containers/FlexContainer";
import Heading from "../../../Elements/Heading";

const Overview = ({ styles, ...props }) => {
  return <Heading>Overview</Heading>;
};

export default withStyles(({ themes, colors }) => {
  return {
    overview: {}
  };
})(Overview);
