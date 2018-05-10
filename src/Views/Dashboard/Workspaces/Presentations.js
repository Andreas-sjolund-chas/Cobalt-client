import React from "react";
import { css, withStyles } from "../../../withStyles";
import FlexContainer from "../../../Containers/FlexContainer";
import Heading from "../../../Elements/Heading";

const Presentations = ({ styles, ...props }) => {
  return <Heading size="3">Presentations</Heading>;
};

export default withStyles(({ themes, colors }) => {
  return {
    presentations: {}
  };
})(Presentations);
