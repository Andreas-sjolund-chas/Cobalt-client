import React from "react";
import ReactDOM from "react-dom";

import WebFont from "webfontloader";

import Root from "./Root";
import "./index.css";

WebFont.load({
  google: {
    families: ["Montserrat:300,400,500,600,700"]
  }
});

ReactDOM.render(<Root />, document.getElementById("app"));
