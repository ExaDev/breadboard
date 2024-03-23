import assert from "node:assert";
import { describe, test } from "node:test";
import { entries } from "../src/nodes/object/entries.js";
import { fromEntries } from "../src/nodes/object/fromEntries.js";
import { gather } from "../src/nodes/object/gather.js";
import { keys } from "../src/nodes/object/keys.js";
import { spread } from "../src/nodes/object/spread.js";
import { values } from "../src/nodes/object/values.js";

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
  await test("fromEntries", async () => {
    const o = { a: 1, b: 2, c: 3 };
    const objectEntries = Object.entries(o);
    const nativeFromEntriesResult = Object.fromEntries(objectEntries);
    assert.deepEqual(nativeFromEntriesResult, o);
    const result = await fromEntries().invoke({ entries: objectEntries });
    assert.deepEqual(result, o);
  });
  await test("keys", async () => {
    const o = { a: 1, b: 2, c: 3 };
    const result = await keys().invoke({ object: o });
    assert.deepEqual(result, {
      keys: Object.keys(o),
    });
  });
  await test("gather", async () => {
    const o = { a: 1, b: 2, c: 3 };
    const result = await gather().invoke(o);
    assert.deepEqual(result, { object: o });
  });
  await test("values", async () => {
    const o = { a: 1, b: 2, c: 3 };
    const result = await values().invoke({ object: o });
    assert.deepEqual(result, {
      values: Object.values(o),
    });
  });
});
