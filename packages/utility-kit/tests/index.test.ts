import assert from "node:assert";
import { describe, test } from "node:test";
import { entries } from "../src/nodes/object/entries.js";
import { spread } from "../src/nodes/object/spread.js";

describe("object nodes", async () => {
  await test("spread", async () => {
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
  await test("entries", async () => {
    const o = { a: 1, b: 2, c: 3 };
    const nativeEntriesResult = Object.entries(o);

    const nodeEntriesResult = await entries().invoke({ object: o });
    const expected = {
      entries: nativeEntriesResult,
    };

    assert.deepEqual(nodeEntriesResult, expected);
  });
});
