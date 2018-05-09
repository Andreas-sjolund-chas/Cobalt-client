import React from "react";
import { css, withStyles } from "../../../withStyles";
import FlexContainer from "../../../Containers/FlexContainer";
import Heading from "../../../Elements/Heading";

const Members = ({ styles, ...props }) => {
  return <Heading>Members</Heading>;
};

export default withStyles(({ themes, colors }) => {
  return {
    members: {}
  };
})(Members);
