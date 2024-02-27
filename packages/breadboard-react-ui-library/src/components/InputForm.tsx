import { Elements } from "../../../breadboard-ui/src/index";
import { createComponent } from "@lit/react";
import React, { useState } from "react";
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
  });

  const [errorMessage, setErrorMessage] = useState(false);
  const handleError = () => {
    console.log("error from comp");
    return setErrorMessage(true);
  };

  return (
    <>
      <LitReactInput onError={handleError} configuration={configuration} />
      {errorMessage && <div>Error from react component.</div>}
    </>
  );
};

export default InputForm;
