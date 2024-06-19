/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { Breadboard } from "@google-labs/breadboard";
import { UriReference } from "./uri-reference";

/**
 * Reference to a Breadboard board file.
 *
 * @examples
 * [
 *  {
 *    "title": "My First Board",
 *    "url": "https://gist.githubusercontent.com/user/SOME_ID/raw/board.bgl.json"
 *  },
 * ]
 */
export class BoardReference {
  /**
   * @examples [ "My Board" ]
   */
  title?: string;

  /**
   * @examples
   * [
   *  "https://gist.githubusercontent.com/user/SOME_ID/raw/board.bgl.json",
   *  "./boards/board.bgl.json"
   * ]
   */
  url: UriReference;

  /**
   * Version of the board file.
   *
   * @examples [ "1.0.0" ]
   * @pattern ^\d+\.\d+\.\d+$
   */
  version?: string;

  // Allow additional properties without allowing it on all other types.
  [x: string | number | symbol]: unknown;

  constructor(data: BoardReference) {
    this.title = data.title;
    this.url = data.url;
    this.version = data.version;
  }
}

export type BoardItem = BoardReference | Breadboard;

export function isBoardReference(item: BoardItem): item is BoardReference {
  return (item as BoardReference).url !== undefined;
}
