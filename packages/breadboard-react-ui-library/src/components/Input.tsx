import { Elements } from "../../../breadboard-ui/src/index";
import { createComponent } from "@lit/react";
import React from "react";
import "./Input.css";

const Input = (): React.JSX.Element => {
  const configuration = {
    schema: {
      properties: {
        secret: {
          title: "name",
          description: `Enter name`,
          type: "string",
        },
      },
    },
  };
  const LitReactInput = createComponent({
    tagName: "bb-input",
    elementClass: Elements.Input,
    react: React,
    events: {},
  });

  return <LitReactInput configuration={configuration} className="input" />;
};

export default Input;
