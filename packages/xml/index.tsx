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

type Edge = { elementType: "edge" } & JSX.BreadboardElement;

function isNode (child: Node | Edge): child is Node {
  return child.elementType === "node"
}

function isEdge(child: Node | Edge): child is Edge {
  return child.elementType === "edge";
}

const Board = ({ id }: { id: string }, children: { nodes: Node[] }[]): {id: string, nodes: Node[]} => {
  const nodes = children[0].nodes;
  console.log(JSON.stringify(children, null, 2));
  return { id, nodes};
};

type Node = {
  id: string;
  type: "input" | "output";
  children?: Node[];
  elementType: "node";
} & JSX.BreadboardElement;

const Nodes = ({ id }: { id: string }, children: Node[]): { nodes: Node[] } => {
  return { nodes: children };
};

const Node = ({ id, type }: { id: string; type: "input" | "output" }): Node => {
  return { id, type, elementType: "node"};
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
