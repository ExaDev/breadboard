import assert from "node:assert";

import { describe, test } from "node:test";
import { at } from "../../../src/nodes/array/at.js";
import { concat } from "../../../src/nodes/array/concat.js";
import { copyWithin } from "../../../src/nodes/array/copyWithin.js";
import { entries } from "../../../src/nodes/array/entries.js";
import { fill } from "../../../src/nodes/array/fill.js";
import { pop } from "../../../src/nodes/array/pop.js";

test("at", async () => {
  const array = [1, 2, 3];
  const index = 1;
  const nativeAtResult = array[index];
  const nodeAtResult = at({ array, index });
  assert.deepEqual(nodeAtResult, { value: nativeAtResult });
});
describe("concat", () => {
  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6];
  const array3 = [7, 8, 9];
  test("append", async () => {
    const nativeConcatResult = array1.concat(array2);
    const nodeConcatResult = concat({ array: array1, append: array2 });
    assert.deepEqual(nodeConcatResult, { array: nativeConcatResult });
  });
  test("prepend", async () => {
    const nativeConcatResult = array2.concat(array1);
    const nodeConcatResult = concat({ array: array1, prepend: array2 });
    assert.deepEqual(nodeConcatResult, { array: nativeConcatResult });
  });
  test("prepend and append", async () => {
    const nodeConcatResult = concat({
      prepend: array1,
      array: array2,
      append: array3,
    });
    assert.deepEqual(nodeConcatResult, {
      array: [...array1, ...array2, ...array3],
    });
  });
});

test("copyWithin", async () => {
  const array = [1, 2, 3, 4, 5];
  const nativeCopyWithinResult = array.copyWithin(0, 3);
  const nodeCopyWithinResult = copyWithin({
    array,
    target: 0,
    start: 3,
  });
  assert.deepEqual(nodeCopyWithinResult, { array: nativeCopyWithinResult });
});

test("fill", async () => {
  const array = [1, 2, 3, 4];
  const nativeFillResult = array.fill(0, 2, 4);
  const nodeFillResult = fill({
    array,
    value: 0,
    start: 2,
    end: 4,
  });
  assert.deepEqual(nodeFillResult, { array: nativeFillResult });
});

test("pop", async () => {
  const array = [1, 2, 3, 4];
  const nativePopResult = [...array].pop();
  assert.deepEqual(
    pop({
      array,
    }),
    {
      array,
      last: nativePopResult,
    }
  );
});

test("entries", async () => {
  const array = [1, 2, 3];
  const nativeEntriesResult = array.entries();
  const nodeEntriesResult = entries({ array });
  assert.deepEqual(nodeEntriesResult, { entries: nativeEntriesResult });
});
