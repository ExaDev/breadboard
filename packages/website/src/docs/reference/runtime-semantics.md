---
layout: docs.liquid
title: Board Runtime Semantics
tags:
  - reference
  - miscellaneous
---

In Breadboard, the concept of "running the board" is pretty important. "Running" is how we turn a [BGL file](/breadboard/docs/concepts/#breadboard-graph-language-bgl) into something that actually works. The process of "running" can be loosely described as component-by-component traversal of the entire board, following the wires, from input to output, until done.

## Entry points

The board starts running from entry point. A board may have more than one entry point and they are visited in order of their appearance in the BGL file.

The entry point is determined using the following steps:

1. If the board run configuration has a `start` argument, use the value of that argument as the label for the entry point. Otherwise, use the `default` label.

2. Find nodes that have the corresponding start tag and use them as starting points.

3. If no such nodes found and there aren't nodes marked with other start tags, use the nodes that have no incoming edges as starting points.

To add start tags to a node, use the node `metadata` object:

```json
{
  "id": "node-448fa",
  "type": "input",
  "metadata": {
    "tags": [
      {
        "type": "start",
        "label": "default"
      }
    ]
  }
}
```

If no `label` is specified, the label value is assumed to be `default`. Also, as a shorthand, the `"start"` string can be used to specify `default` start tag. This node descriptor is equivalent to the one above:

```json
{
  "id": "node-448fa",
  "type": "input",
  "metadata": {
    "tags": [{ "type": "start" }]
  }
}
```

And so is this one:

```json
{
  "id": "node-448fa",
  "type": "input",
  "metadata": {
    "tags": ["start"]
  }
}
```

## Runtime modes

The condition of "done" is different depending on the mode under which the board runs. There are two modes: the "run" mode and the "run as component" mode.

### "Run" mode

The **run** mode is what we typically see when we run the board directly. In this mode, the board runs until there are no more components to visit after following the wires. This means that if the board has wires that form cycles between components, this board will run forever. This isn't necessarily a bad thing. For instance, a chat bot board might be okay to run like that.

In the **run** mode, the board may visit many [`input`](/breadboard/docs/reference/kits/built-in/#the-input-node) and [`output`](/breadboard/docs/reference/kits/built-in/#output-ports) components throughout the run, producing multiple outputs and requesting multiple outputs. The chat bot from example above will wait for user input (using the `input` component) and then provide a response (using the `output` component), over and over.

The implementation of the **run** mode can be found in [run-graph.ts](https://github.com/breadboard-ai/breadboard/blob/main/packages/breadboard/src/run/run-graph.ts).

### "Run as component" mode

The **run as component** mode (also known as "invoke" mode) is a bit more limited, and is designed to mimic the behavior of a component. This mode is being used whenever the board is used as a component inside of another board, be it part of a kit, or used by the [`invoke`](/breadboard/docs/kits/core/#the-invoke-component), [`map`](/breadboard/docs/kits/core/#the-map-component), or [`reduce`](/breadboard/docs/kits/core/#the-reduce-component) components.

To mimic a component, the board must only request input once (just like the component would only have one set of input ports), and only provide output once -- since the component only provides outputs once.

In **run as component** mode, the board will provide the same set of input values to any `input` component it visits, and not stop to request input from user. It will also stop running as soon as it encounters the first `output` component.

The implementation of the **run as component** node can be found in [invoke-graph.ts](https://github.com/breadboard-ai/breadboard/blob/main/packages/breadboard/src/run/invoke-graph.ts).

```

```
