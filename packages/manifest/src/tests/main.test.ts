/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import Ajv, { type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import * as assert from "node:assert";
import test, { describe } from "node:test";
import schema from "../../bbm.schema.json" with { type: "json" };
import { BreadboardManifest, ConreteManifestResource } from "../types";

const ajv = new Ajv({
  // keywords: definitions({
  //   // defaultMeta: "draft-07",
  // }),
  validateSchema: true,
  validateFormats: true,
  strictTypes: true,
  strict: true,
  formats: {
    // "uri-reference": require("ajv-formats/dist/formats").fullFormats["uri-reference"],
  },
  verbose: true,
  allErrors: true,
});
addFormats(ajv);

let validate: ValidateFunction;

test.before(() => {
  validate = ajv.compile(schema);
});

test("Schema is valid.", async () => {
  assert.ok(validate);
});

const fixtures: ConreteManifestResource[] = [
  { title: "Manifest with an empty boards array", resource: { boards: [] } },
  {
    title: "Manifest with an empty manifests array",
    resource: { manifests: [] },
  },
  {
    title: "Manifest with empty boards and manifests arrays",
    resource: {
      boards: [],
      manifests: [],
    },
  },
  {
    title: "Manifest with boards",
    resource: {
      boards: [
        {
          title: "My First Board",
          url: "https://gist.githubusercontent.com/user/SOME_ID/raw/board.bgl.json",
          version: "1.0.0",
        },
        {
          title: "My Second Board",
          url: "./boards/board.bgl.json",
        },
      ],
    },
  },
  {
    title: "Manifest with manifests",
    resource: {
      manifests: [
        {
          title: "Gist Manifest",
          url: "https://gist.githubusercontent.com/user/SOME_ID/raw/manifest.bbm.json",
        },
      ],
    },
  },
  {
    title: "Manifest with boards and manifests",
    resource: {
      boards: [
        {
          title: "My First Board",
          url: "https://gist.githubusercontent.com/user/SOME_ID/raw/board.bgl.json",
          version: "1.0.0",
        },
        {
          title: "My Second Board",
          url: "./boards/board.bgl.json",
        },
      ],
      manifests: [
        {
          title: "Gist Manifest",
          url: "https://gist.githubusercontent.com/user/SOME_ID/raw/manifest.bbm.json",
        },
      ],
    },
  },
  {
    title: "Nested manifest",
    resource: {
      manifests: [
        {
          title: "Gist Manifest",
          url: "https://gist.githubusercontent.com/user/SOME_ID/raw/manifest.bbm.json",
        },
        {
          title: "Nested Nested Manifest",
          resource: {
            boards: [
              {
                title: "My First Board",
                url: "https://gist.githubusercontent.com/user/SOME_ID/raw/board.bgl.json",
                version: "1.0.0",
              },
            ],
            manifests: [
              {
                title: "Nested Nested Nested Manifest",
                resource: {
                  boards: [
                    {
                      title: "My First Board",
                      url: "https://gist.githubusercontent.com/user/SOME_ID/raw/board.bgl.json",
                      version: "1.0.0",
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
];

for (const manifest of fixtures) {
  const index = fixtures.indexOf(manifest);
  test(
    [`Manifest ${index + 1}/${fixtures.length}`, manifest.title]
      .filter(Boolean)
      .join(": "),
    async () => {
      const valid = validate(manifest);
      assert.ok(valid);
    }
  );
  console.debug();
}

describe("BreadboardManifest", () => {
  const test = new ConreteManifestResource({
    resource: new BreadboardManifest({
      boards: [],
      manifests: [],
    }),
  });

  // const resource: BreadboardManifest = await test.retrieve();
});
