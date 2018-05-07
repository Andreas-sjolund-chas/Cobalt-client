import React from "react";

import { storiesOf } from "@storybook/react";

import SessionGraph from "../../Components/SessionGraph";

const data = require("./data.json");

storiesOf("Session Graph", module).add("Session graph", () => (
  <SessionGraph data={data} />
));
