import * as React from "react";
import { createComponent } from "@lit/react";
import { BoardItem } from "../../../breadboard-ui/dist/src/elements/board-list/board-list";

const BoardItemWrapper = createComponent({
  tagName: "bb-board-item",
  elementClass: BoardItem,
  react: React,
});

export default BoardItemWrapper;
