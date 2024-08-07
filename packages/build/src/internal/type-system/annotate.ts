/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { BehaviorSchema } from "@google-labs/breadboard";
import { toJSONSchema, type BreadboardType } from "./type.js";

/**
 * Add Breadboard-specific annotations to a schema.
 */
export function annotate<T extends BreadboardType>(
  value: T,
  annotations: {
    behavior: BehaviorSchema[];
  }
): T {
  const original = toJSONSchema(value);
  const behavior = [
    ...new Set([...(original.behavior ?? []), ...annotations.behavior]),
  ];
  return {
    jsonSchema: {
      ...original,
      behavior,
    },
  } as BreadboardType as T;
}
