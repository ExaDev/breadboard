/** @jsx h */
/* eslint-disable @typescript-eslint/no-namespace */

export function h(
  tag: string,
  attrs: unknown,
  ...children: unknown[]
): unknown {
  return { tag, attrs, children: children.length ? children : undefined };
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      [attr: string]: unknown;
    }

    interface InputAttributes {
      id: string;
    }

    interface OutputAttributes {
      id: string;
    }

    interface EdgeAttributes {
      from: string;
      out?: string;
      to: string;
      in?: string;
    }

    interface IntrinsicElements {
      input: InputAttributes;
      output: OutputAttributes;
      edge: EdgeAttributes;
      board: IntrinsicAttributes;
      nodes: IntrinsicAttributes;
      edges: IntrinsicAttributes;
    }
  }
}

const xmlData = (
  <board>
    <nodes>
      <input id="input-1" />
      <output id="output-1" />
    </nodes>
    <edges>
      <edge from="input-1" out="say" to="output-1" in="hear" />
    </edges>
  </board>
);

console.log(xmlData);
