import React from "react";

import { storiesOf } from "@storybook/react";

import SessionGraph from "../../Components/SessionGraph";
import Card from "../../Elements/Card";

const data = require("./data.json");

storiesOf("Session Graph", module)
  .add("Average", () => <SessionGraph data={data} isAverage />)
  .add("Positive / Negative", () => <SessionGraph data={data} />)
  .add("Percentage In Card", () => (
    <Card style={{ margin: "35px" }}>
      <SessionGraph data={data} />
    </Card>
  ))
  .add("Average In Card", () => (
    <Card style={{ margin: "35px" }}>
      <SessionGraph isAverage data={data} />
    </Card>
  ));
