/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export type GraphStoreItem<T> = {
  url: string;
  mine: boolean;
  readonly: boolean;
  handle: T;
};

export type GraphProviderStore<T = unknown> = {
  permission: "unknown" | "prompt" | "granted";
  title: string;
  items: Map<string, GraphStoreItem<T>>;
};
