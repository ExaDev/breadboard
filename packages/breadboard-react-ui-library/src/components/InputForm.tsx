import { Elements } from "../../../breadboard-ui/src/index";
import { createComponent } from "@lit/react";
import React from "react";
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
    events: {
      onerror: "parseError",
    },
  });

  return (
    <LitReactInput
      onerror={() => console.log("Lit element threw an error")}
      configuration={configuration}
    />
  );
};

export default InputForm;
