import { createComponent } from "@lit/react";
import React from "react";
import { Preview } from "../../../breadboard-web/src/preview.js";
import background from "../../../breadboard-web/public/images/pattern.png";
import "../../breadboard-web/public/styles/preview.css";

const PreviewWrapper = (): React.JSX.Element => {
  const LitReactPreview = createComponent({
    tagName: "bb-preview",
    elementClass: Preview,
    react: React,
    events: {},
  });

  return (
    <LitReactPreview
      style={{
        backgroundImage: `url(${background})`,
        marginTop: "3em",
        border: "1px solid black",
      }}
    />
  );
};

export default PreviewWrapper;
