import * as React from "react";
import { createComponent } from "@lit/react";
import { BreadboardElements } from "../breadboard-web-exports";

const UIControllerWrapper = createComponent({
  tagName: "bb-ui-controller",
  elementClass: BreadboardElements.UI,
  react: React,
  events: {
    handleStateChange: "handleStateChange",
  },
});

export default UIControllerWrapper;
