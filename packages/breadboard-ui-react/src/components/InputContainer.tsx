import * as React from "react";
import { createComponent } from "@lit/react";
import { InputContainer } from "../../../breadboard-ui/dist/src/elements/input/input-container/input-container.js";

const InputContainerWrapper = createComponent({
  tagName: "bb-input-container",
  elementClass: InputContainer,
  react: React,
});

export default InputContainerWrapper;
