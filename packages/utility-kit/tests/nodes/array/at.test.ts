import assert from "node:assert";
import { test } from "node:test";
import { at } from "../../../src/nodes/array/at.js";

test("at", async () => {
  const array = [1, 2, 3];
  const index = 1;
  const nativeAtResult = array[index];
  const nodeAtResult = at({ array, index });
  assert.deepEqual(nodeAtResult, { value: nativeAtResult });
});
