import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Icon from "../../Elements/Icon";

storiesOf("Icon", module)
  .add("xs", () => (
    <Icon icon="fas fa-envelope" size="xs" fillColor="primary" />
  ))
  .add("small", () => (
    <Icon icon="fas fa-envelope" size="small" fillColor="secondary" />
  ))
  .add("medium", () => (
    <Icon icon="fas fa-envelope" size="medium" fillColor="nightsky" />
  ))
  .add("large", () => (
    <Icon icon="fas fa-envelope" size="large" fillColor="danger" />
  ))
));
