import { JSDOM } from "jsdom";

function convertXmlToJson(xml: string): string {
  const dom = new JSDOM(xml, { contentType: "text/xml" });
  const document = dom.window.document;

  // Parse nodes
  const nodes = Array.from(document.querySelectorAll("nodes > *")).map(
    (node) => ({
      id: node
        .getAttribute("id")!
        .replace("input", "input-")
        .replace("output", "output-"), // Replace to match desired ID format
      type: node.tagName.toLowerCase(),
    })
  );

  // Parse edges
  const edges = Array.from(document.querySelectorAll("edges > edge")).map(
    (edge) => ({
      from: edge.getAttribute("from")!,
      out: edge.getAttribute("out")!,
      to: edge.getAttribute("to")!,
      in: edge.getAttribute("in")!,
    })
  );

  // Construct JSON structure
  const result = {
    nodes,
    edges,
  };

  return JSON.stringify(result, null, 2); // Pretty print the JSON
}

// Sample XML string
const xml = `
<board>
  <nodes>
    <input id='input1' />
    <output id='output1' />
  </nodes>
  <edges>
    <edge from="input-1" out="say" to="output-1" in="hear" />
  </edges>
</board>
`;

// Convert XML to JSON and log
const json = convertXmlToJson(xml);
console.log(json);
