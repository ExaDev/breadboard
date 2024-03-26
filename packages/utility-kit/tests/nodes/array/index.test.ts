import assert from "node:assert";

import { describe, test } from "node:test";
import { at } from "../../../src/nodes/array/at.js";
import { concat } from "../../../src/nodes/array/concat.js";
import { copyWithin } from "../../../src/nodes/array/copyWithin.js";
import { entries } from "../../../src/nodes/array/entries.js";
import { fill } from "../../../src/nodes/array/fill.js";
import { flat } from "../../../src/nodes/array/flat.js";
import { includes } from "../../../src/nodes/array/includes.js";
import { indexOf } from "../../../src/nodes/array/indexOf.js";
import { isArray } from "../../../src/nodes/array/isArray.js";
import { keys } from "../../../src/nodes/array/keys.js";
import { lastIndexOf } from "../../../src/nodes/array/lastIndexOf.js";
import { length } from "../../../src/nodes/array/length.js";
import { pop } from "../../../src/nodes/array/pop.js";
import { push } from "../../../src/nodes/array/push.js";
import { reverse } from "../../../src/nodes/array/reverse.js";
import { shift } from "../../../src/nodes/array/shift.js";
import { slice } from "../../../src/nodes/array/slice.js";
import { unshift } from "../../../src/nodes/array/unshift.js";
import { values } from "../../../src/nodes/array/values.js";
import { withValue } from "../../../src/nodes/array/withValue.js";

test("at", () => {
  const array = [1, 2, 3];
  const index = 1;
  const nativeAtResult = array[index];
  const nodeAtResult = at({ array, index });
  assert.deepEqual(nodeAtResult, { value: nativeAtResult });
});

describe("isArray", () => {
  test("array", () => {
    const array = [1, 2, 3];
    const nativeIsArrayResult = Array.isArray(array);
    const nodeIsArrayResult = isArray({ value: array });
    assert.deepEqual(nodeIsArrayResult, { isArray: nativeIsArrayResult });
  });
  test("non-array", () => {
    const value = 1;
    const nativeIsArrayResult = Array.isArray(value);
    const nodeIsArrayResult = isArray({ value });
    assert.deepEqual(nodeIsArrayResult, { isArray: nativeIsArrayResult });
  });
});

describe("concat", () => {
  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6];
  const array3 = [7, 8, 9];
  test("append", () => {
    const nativeConcatResult = array1.concat(array2);
    const nodeConcatResult = concat({ array: array1, append: array2 });
    assert.deepEqual(nodeConcatResult, { array: nativeConcatResult });
  });
  test("prepend", () => {
    const nativeConcatResult = array2.concat(array1);
    const nodeConcatResult = concat({ array: array1, prepend: array2 });
    assert.deepEqual(nodeConcatResult, { array: nativeConcatResult });
  });
  test("prepend and append", () => {
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

describe("copyWithin", () => {
  const array = [1, 2, 3, 4, 5];
  const nativeCopyWithinResult = array.copyWithin(0, 3, 4);
  const nodeCopyWithinResult = copyWithin({
    array,
    target: 0,
    start: 3,
    end: 4,
  });
  assert.deepEqual(nodeCopyWithinResult, { array: nativeCopyWithinResult });
});

describe("entries", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const nativeEntriesResult = array.entries();
    const nodeEntriesResult = entries({ array });
    assert.deepEqual(nodeEntriesResult, { entries: nativeEntriesResult });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const nativeEntriesResult = array.entries();
    const nodeEntriesResult = entries({ array });
    assert.deepEqual(nodeEntriesResult, { entries: nativeEntriesResult });
  });
});

describe("fill", () => {
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

describe("flat", () => {
  test("without depth argument", () => {
    const array = [1, [2, [3, 4], 5]];
    const nativeFlatResult = array.flat();
    const nodeFlatResult = flat({ array });
    assert.deepEqual(nodeFlatResult, { array: nativeFlatResult });
  });
  test("with depth argument", () => {
    const array = [1, [2, [3, 4], 5]];
    const depth = 1;
    const nativeFlatResult = array.flat(depth);
    const nodeFlatResult = flat({ array, depth });
    assert.deepEqual(nodeFlatResult, { array: nativeFlatResult });
  });
  test("with depth argument of 0", () => {
    const array = [1, [2, [3, 4], 5]];
    const depth = 0;
    const nativeFlatResult = array.flat(depth);
    const nodeFlatResult = flat({ array, depth });
    assert.deepEqual(nodeFlatResult, { array: nativeFlatResult });
  });
  test("with depth argument of -1", () => {
    const array = [1, [2, [3, 4], 5]];
    const depth = -1;
    const nativeFlatResult = array.flat(depth);
    const nodeFlatResult = flat({ array, depth });
    assert.deepEqual(nodeFlatResult, { array: nativeFlatResult });
  });
  test("with depth argument of 20", () => {
    const array = [1, [2, [3, 4], 5]];
    const depth = 20;
    const nativeFlatResult = array.flat(depth);
    const nodeFlatResult = flat({ array, depth });
    assert.deepEqual(nodeFlatResult, { array: nativeFlatResult });
  });
});

describe("includes", () => {
  test("a value that is in the array", () => {
    const array = [1, 2, 3];
    const value = 2;
    const nativeIncludesResult = array.includes(value);
    const nodeIncludesResult = includes({ array, value });
    assert.deepEqual(nodeIncludesResult, { includes: nativeIncludesResult });
  });
  test("a value that is not in the array", () => {
    const array = [1, 2, 3];
    const value = 4;
    const nativeIncludesResult = array.includes(value);
    const nodeIncludesResult = includes({ array, value });
    assert.deepEqual(nodeIncludesResult, { includes: nativeIncludesResult });
  });
  test("a value that is in the array multiple times", () => {
    const array = [1, 2, 3, 2];
    const value = 2;
    const nativeIncludesResult = array.includes(value);
    const nodeIncludesResult = includes({ array, value });
    assert.deepEqual(nodeIncludesResult, { includes: nativeIncludesResult });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const value = 1;
    const nativeIncludesResult = array.includes(value);
    const nodeIncludesResult = includes({ array, value });
    assert.deepEqual(nodeIncludesResult, { includes: nativeIncludesResult });
  });
});

describe("indexOf", () => {
  test("a value that is in the array", () => {
    const array = [1, 2, 3];
    const value = 2;
    const nativeIndexOfResult = array.indexOf(value);
    const nodeIndexOfResult = indexOf({ array, value });
    assert.deepEqual(nodeIndexOfResult, { index: nativeIndexOfResult });
  });
  test("a value that is not in the array", () => {
    const array = [1, 2, 3];
    const value = 4;
    const nativeIndexOfResult = array.indexOf(value);
    const nodeIndexOfResult = indexOf({ array, value });
    assert.deepEqual(nodeIndexOfResult, { index: nativeIndexOfResult });
  });
  test("a value that is in the array multiple times", () => {
    const array = [1, 2, 3, 2];
    const value = 2;
    const nativeIndexOfResult = array.indexOf(value);
    const nodeIndexOfResult = indexOf({ array, value });
    assert.deepEqual(nodeIndexOfResult, { index: nativeIndexOfResult });
  });
});

describe("keys", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const nativeKeysResult = array.keys();
    const nodeKeysResult = keys({ array });
    assert.deepEqual(nodeKeysResult, { keys: nativeKeysResult });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const nativeKeysResult = array.keys();
    const nodeKeysResult = keys({ array });
    assert.deepEqual(nodeKeysResult, { keys: nativeKeysResult });
  });
});

describe("lastIndexOf", () => {
  test("a value that is in the array", () => {
    const array = [1, 2, 3];
    const value = 2;
    const nativeLastIndexOfResult = array.lastIndexOf(value);
    const nodeLastIndexOfResult = lastIndexOf({ array, value });
    assert.deepEqual(nodeLastIndexOfResult, { index: nativeLastIndexOfResult });
  });
  test("a value that is not in the array", () => {
    const array = [1, 2, 3];
    const value = 4;
    const nativeLastIndexOfResult = array.lastIndexOf(value);
    const nodeLastIndexOfResult = lastIndexOf({ array, value });
    assert.deepEqual(nodeLastIndexOfResult, { index: nativeLastIndexOfResult });
  });
  test("a value that is in the array multiple times", () => {
    const array = [1, 2, 3, 2];
    const value = 2;
    const nativeLastIndexOfResult = array.lastIndexOf(value);
    const nodeLastIndexOfResult = lastIndexOf({ array, value });
    assert.deepEqual(nodeLastIndexOfResult, { index: nativeLastIndexOfResult });
  });
});

describe("length", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const nativeLengthResult = array.length;
    const nodeLengthResult = length({ array });
    assert.deepEqual(nodeLengthResult, { length: nativeLengthResult });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const nativeLengthResult = array.length;
    const nodeLengthResult = length({ array });
    assert.deepEqual(nodeLengthResult, { length: nativeLengthResult });
  });
});

describe("pop", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const nodePopResult = pop({ array: [...array] });
    const nativePopResult = array.pop();
    assert.deepEqual(nodePopResult, { value: nativePopResult, array });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const nativePopResult = array.pop();
    const nodePopResult = pop({ array });
    assert.deepEqual(nodePopResult, { value: nativePopResult, array });
  });
});

describe("push", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const value = 4;
    const nodePushResult = push({ array: [...array], value });
    const length = array.push(value);
    assert.deepEqual(nodePushResult, { array, length });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const value = 1;
    const nodePushResult = push({ array: [...array], value });
    const length = array.push(value);
    assert.deepEqual(nodePushResult, { array, length });
  });
  test("multiple values", () => {
    const array = [1, 2, 3];
    const value1 = 4;
    const value2 = 5;
    const nodePushResult = push({ array: [...array], value: [value1, value2] });
    const length = array.push(value1, value2);
    assert.deepEqual(nodePushResult, { array, length });
  });
});

describe("reverse", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const nodeReverseResult = reverse({ array: [...array] });
    const nativeReverseResult = array.reverse();
    assert.deepEqual(nodeReverseResult, { array: nativeReverseResult });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const nodeReverseResult = reverse({ array });
    const nativeReverseResult = array.reverse();
    assert.deepEqual(nodeReverseResult, { array: nativeReverseResult });
  });
});

describe("shift", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const nodeShiftResult = shift({ array: [...array] });
    const nativeShiftResult = array.shift();
    assert.deepEqual(nodeShiftResult, { value: nativeShiftResult, array });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const nativeShiftResult = array.shift();
    const nodeShiftResult = shift({ array });
    assert.deepEqual(nodeShiftResult, { value: nativeShiftResult, array });
  });
});

describe("slice", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const nodeSliceResult = slice({ array: [...array], start: 1, end: 2 });
    const nativeSliceResult = array.slice(1, 2);
    assert.deepEqual(nodeSliceResult, { array: nativeSliceResult });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const nodeSliceResult = slice({ array, start: 0, end: 0 });
    const nativeSliceResult = array.slice(0, 0);
    assert.deepEqual(nodeSliceResult, { array: nativeSliceResult });
  });
});

describe("unshift", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const value = 0;
    const nodeUnshiftResult = unshift({ array: [...array], value });
    const nativeUnshiftResult = array.unshift(value);
    assert.deepEqual(nodeUnshiftResult, { length: nativeUnshiftResult, array });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const value = 1;
    const nodeUnshiftResult = unshift({ array: [...array], value });
    const nativeUnshiftResult = array.unshift(value);
    assert.deepEqual(nodeUnshiftResult, { length: nativeUnshiftResult, array });
  });
  test("multiple values", () => {
    const array = [1, 2, 3];
    const value1 = 0;
    const value2 = -1;
    const nodeUnshiftResult = unshift({
      array: [...array],
      value: [value1, value2],
    });
    const nativeUnshiftResult = array.unshift(value1, value2);
    assert.deepEqual(nodeUnshiftResult, { length: nativeUnshiftResult, array });
  });
});

describe("values", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const nativeValuesResult = array.values();
    const nodeValuesResult = values({ array });
    assert.deepEqual(nodeValuesResult, { values: nativeValuesResult });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const nativeValuesResult = array.values();
    const nodeValuesResult = values({ array });
    assert.deepEqual(nodeValuesResult, { values: nativeValuesResult });
  });
});

describe("withValue", () => {
  test("an array with elements", () => {
    const array = [1, 2, 3];
    const index = 1;
    const value = 4;
    const nodeWithValueResult = withValue({ array: [...array], index, value });
    array[index] = value;
    assert.deepEqual(nodeWithValueResult, { array });
  });
  test("an empty array", () => {
    const array: number[] = [];
    const index = 0;
    const value = 1;
    const nodeWithValueResult = withValue({ array, index, value });
    array[index] = value;
    assert.deepEqual(nodeWithValueResult, { array });
  });
});
