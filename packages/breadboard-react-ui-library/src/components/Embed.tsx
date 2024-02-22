import { createComponent } from "@lit/react";
import React from "react";
import { Embed } from "../../../breadboard-web/src/embed.js";
//import background from "../../../breadboard-web/public/images/pattern.png";

const EmbedWrapper = (): React.JSX.Element => {
  const LitReactEmbed = createComponent({
    tagName: "bb-embed",
    elementClass: Embed,
    react: React,
    events: {},
  });

  return (
    <LitReactEmbed style={{ marginTop: "3em" }} url="/graphs/blank.json" />
  );
};

export default EmbedWrapper;
