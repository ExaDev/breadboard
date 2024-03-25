import assert from "node:assert";
import { test } from "node:test";
import { pop } from "../../../src/nodes/array/pop.js";

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
