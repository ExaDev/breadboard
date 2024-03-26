import assert from "node:assert";
import { test } from "node:test";
import {
  fromEntries,
  gather,
  keys,
  objectEntries,
  rest,
  spread,
  values,
} from "../../../src/nodes/object/index.js";

await test("entries", async () => {
  const o = { a: 1, b: 2, c: 3 };
  const nativeEntriesResult = Object.entries(o);

  const nodeEntriesResult = await objectEntries().invoke({ object: o });
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

await test("gather", async () => {
  const o = { a: 1, b: 2, c: 3 };
  const result = await gather().invoke(o);
  assert.deepEqual(result, { object: o });
});
await test("keys", async () => {
  const o = { a: 1, b: 2, c: 3 };
  const result = await keys().invoke({ object: o });
  assert.deepEqual(result, {
    keys: Object.keys(o),
  });
});

await test("rest", async () => {
  const o = { a: 1, b: 2, c: 3 };
  const { a, ...obj } = o;
  const result = await rest().invoke({ object: o, key: "a" });
  assert.deepEqual(result, { a, rest: obj });
});

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

await test("values", async () => {
  const o = { a: 1, b: 2, c: 3 };
  const result = await values().invoke({ object: o });
  assert.deepEqual(result, {
    values: Object.values(o),
  });
});
