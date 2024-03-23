import assert from "node:assert";
import { describe, test } from "node:test";
import { spread } from "../src/nodes/object/spread.js";

describe("object nodes", async () => {
  await test("native spread", async () => {
    const nestedProperty = { b: 2, d: { e: 4 } };
    const o = {
      nestedProperty,
      d: 3,
    };
    const nativeSpreadResult = { ...o.nestedProperty };

    assert.deepEqual(nativeSpreadResult, nestedProperty);

    const nodeSpreadResult = await spread().invoke({
      object: o.nestedProperty,
    });

    assert.deepEqual(nodeSpreadResult, nestedProperty);
    assert.deepEqual(nodeSpreadResult, nativeSpreadResult);
  });
});
