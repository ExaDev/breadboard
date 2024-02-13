import * as React from "react";
import { createComponent } from "@lit/react";
import { BreadboardElements } from "../breadboard-web-exports";

const InputWrapper = createComponent({
  tagName: "bb-input",
  elementClass: BreadboardElements.Input,
  react: React,
  events: {
    onSubmit: "onSubmit",
  },
});

export default InputWrapper;
