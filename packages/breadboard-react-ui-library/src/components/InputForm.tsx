import { Elements } from "../../../breadboard-ui/src/index";
import { createComponent } from "@lit/react";
import React from "react";
import "./Input.css";
import { Schema } from "@google-labs/breadboard";
import "../../../breadboard-ui/public/styles/global.css";

type InputFormProps = {
  configuration: {
    schema: Schema;
  };
};

const InputForm = ({ configuration }: InputFormProps): React.JSX.Element => {
  const LitReactInput = createComponent({
    tagName: "bb-input",
    elementClass: Elements.Input,
    react: React,
    events: {},
  });

  return <LitReactInput configuration={configuration} />;
};

export default InputForm;
