/* eslint-disable @typescript-eslint/no-unused-vars */
import { BreadboardJSX } from "./BreadboardJSX.js";

/** @jsx BreadboardJSX.Breadboard.createBoard */
/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace JSX {
    // interface IntrinsicAttributes {
    //   [attr: string]: unknown;
    //   children?: unknown;
    // }

    // interface InputAttributes {
    //   id: string;
    // }

    // interface OutputAttributes {
    //   id: string;
    // }

    // interface EdgeAttributes {
    //   from: string;
    //   out?: string;
    //   to: string;
    //   in?: string;
    // }

    // interface IntrinsicElements {
    //   input: InputAttributes;
    //   output: OutputAttributes;
    //   edge: EdgeAttributes;
    //   board: unknown;
    //   nodes: unknown;
    //   edges: unknown;
    // }
    type Element = unknown;

    type BreadboardElement = Element;
  }
}

const Board = ({ id }: { id: string }, children: Node | Node[]) => {
  return { id, children };
};

type Node = {
  id: string;
  type: "input" | "output";
  children?: Node[];
} & JSX.BreadboardElement;

const Nodes = ({ id }: { id: string }, children: Node[]): Node[] => {
  return children;
};

const Node = ({ id, type }: { id: string; type: "input" | "output" }): Node => {
  return { id, type };
};

const xmlData = (
  <Board id="bar">
    <Nodes id="hello">
      <Node id="foo" type="input" />
      <Node id="baz" type="output" />
    </Nodes>
  </Board>
);

console.log(JSON.stringify(xmlData, null, 2));
