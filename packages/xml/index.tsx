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

const Board = (
  { id }: { id: string },
  children: { nodes: Node[]; edges: Edge[] }[]
): { nodes: Node[]; edges: Edge[] } => {
  const nodes = children[0].nodes;
  const edges = children[1].edges;
  return { nodes, edges };
};

type Node = {
  id: string;
  type: "input" | "output";
} & JSX.BreadboardElement;

const Nodes = ({ id }: { id: string }, children: Node[]): { nodes: Node[] } => {
  return { nodes: children };
};

const Node = ({ id, type }: { id: string; type: "input" | "output" }): Node => {
  return { id, type };
};

type Edge = {
  from: string;
  to: string;
  out: string;
  in: string;
} & JSX.BreadboardElement;

const Edges = ({ id }: { id: string }, children: Edge[]): { edges: Edge[] } => {
  return { edges: children };
};

const Edge = (edge: Edge): Edge => {
  return edge;
};

const xmlData = (
  <Board id="test">
    <Nodes id="hello">
      <Node id="input-1" type="input" />
      <Node id="output-1" type="output" />
    </Nodes>
    <Edges id="world">
      <Edge from="input-1" to="output-1" out="say" in="hear" />
    </Edges>
  </Board>
);

console.log(JSON.stringify(xmlData, null, 2));
