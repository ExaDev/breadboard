import assert from "node:assert";
import { test } from "node:test";
import { concat } from "../../../src/nodes/array/concat.js";

test("concat", async () => {
  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6];
  const nativeConcatResult = array1.concat(array2);
  const nodeConcatResult = concat({ array: array1, append: array2 });
  assert.deepEqual(nodeConcatResult, { array: nativeConcatResult });
});
