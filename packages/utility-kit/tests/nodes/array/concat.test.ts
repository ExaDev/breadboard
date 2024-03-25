import assert from "node:assert";
import { describe, test } from "node:test";
import { concat } from "../../../src/nodes/array/concat.js";

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
    const nativeConcatResult = array1.concat(array2, array3);
    const nodeConcatResult = concat({
      prepend: array1,
      array: array2,
      append: array3,
    });
    assert.deepEqual(nodeConcatResult, { array: nativeConcatResult });
  });
});
