import * as React from "react";
import { createComponent } from "@lit/react";
import { BreadboardElements } from "../breadboard-web-exports";

const BoardListWrapper = createComponent({
  tagName: "bb-board-list",
  elementClass: BreadboardElements.BoardList,
  react: React,
});

export default BoardListWrapper;
