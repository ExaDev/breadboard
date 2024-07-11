---
layout: docs.njk
title: Playbook
tags:
  - guide
  - wip
date: 2020-01-06 # Sixth in the list
---

This guide contains a collection of patterns aimed at answering "how do I...?" questions. It is very much a work in progress.

> [!TIP]
> We'd love to hear how you're getting on with Breadboard. If you want to ask us a question you can always join our [Discord](https://discord.gg/breadboard).

## Splitting an Array

There are two ways to do this, one of which uses a [`jsonata` component](../../kits/json/#the-jsonata-node), the other using a [`runJavascript` component](../../kits/core/#the-runjavascript-node). We'll cover both here.

In both cases we will use a `runJavascript` component to _generate_ an array with two numbers, which we will then split out, and send over as two separate output values to our output component.

### Using JSONata

To do this our board looks like something this:

{{ "/breadboard/static/boards/playbook/array-split-1.json" | board }}

The key is to use the [`jsonata` component](../../kits/json/#the-jsonata-node) to select out the array values with this query.

```prompt
$[0]
```

This line of JSONata is used to select the zeroth item of the "root entry", which in this case is the first number in the array. Similarly, to get the second number we can use the following JSONata query.

```prompt
$[1]
```

Our JSONata component details input should look like this:

![The JSONata input](/breadboard/static/images/playbook/jsonata-input.png)

> [!TIP]
> JSONata can be a bit challenging to get used to, but it's also incredibly powerful and flexible. We recommend looking over the documentation and trying out the [JSONata Exerciser](https://try.jsonata.org/) to get more used to it.

When we run the board we will see two separate outputs.

![The board output](/breadboard/static/images/playbook/array-split-output.png)

### Using runJavascript

We can also use [`runJavascript` component](../../kits/core/#the-runjavascript-node) to select out the values, but this is slightly more involved than using the `jsonata` component. The board itself looks similar to the `jsonata` one above.

{{ "/breadboard/static/boards/playbook/array-split-2.json" | board }}

> [!NOTE]
> While using `runJavascript` involves a little more work than its `jsonata` counterpart, it does give us the chance to change the value or manipulate it in other ways that may be more challenging (or harder to read in `jsonata`). Both are good approaches, though, and we can use whichever suits our end goals.

Looking at the code in the **First Number `runJavascript`** component we will see this JavaScript:

```js
const run = ({ result }) => result[0];
```

Here we use JavaScript to select out the first entry of the array by hand.

The name of the destructured parameter passed to `run` is called `result`. By default, however, you will see that a `runJavascript` component has no such input, so how do we see an additional port called `result`?

![The result port on the runJavascript component](/breadboard/static/images/playbook/array-split-dynamic-wire.png)

> [!TIP]
> We can expand on a component within the Visual Editor by double clicking on its header. When we do this for our **First Number** component we will see the additional port created called `result`.

The answer is that we create a [dynamic wire](../../visual-editor/components/#dynamic-wires) from the **Number Generator** _to_ the **First Number** component, which is done by dragging from the Number Generator to the middle of the First Number component. On releasing the mouse we will be asked to name the wire, and we can use the name `result` (or anything else we prefer). Whatever we call the port will then be used as the input's name.

![Dragging from one port to the drop zone of another component](/breadboard/static/images/using-the-visual-editor/drop-zone.png)