import { Elements } from "../../../breadboard-ui/src/index";
import { createComponent } from "@lit/react";
import React from "react";
import "../../../breadboard-ui/public/styles/global.css";
import {
  BreadboardReactComponentProps,
  InputArgs,
} from "../../../breadboard-ui/src/types/types";
import { handleError } from "../lib/errors";

type InputFormProps = InputArgs & BreadboardReactComponentProps;

const InputForm = ({ schema, onError }: InputFormProps): React.JSX.Element => {
  const LitReactInput = createComponent({
    tagName: "bb-input",
    elementClass: Elements.Input,
    react: React,
  });

  return (
    <>
      <LitReactInput
        onError={handleError(onError)}
        configuration={{ schema: schema }}
      />
    </>
  );
};

export default InputForm;
