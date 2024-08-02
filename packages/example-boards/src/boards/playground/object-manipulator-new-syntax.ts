/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * see: https://hn.algolia.com/api
 */

import { code } from "@google-labs/core-kit";
import { BreadboardType, JsonSerializable } from "@breadboard-ai/build/internal/type-system/type.js";
import { Input, InputWithDefault } from "@breadboard-ai/build/internal/board/input.js";
import { OutputPort } from "@breadboard-ai/build/internal/common/port.js";
import { array, board, enumeration, output, object, } from "@breadboard-ai/build";


import { input } from "@breadboard-ai/build";
import { CodeOutputConfig } from "../../../../core-kit/dist/src/nodes/code";

export function createManipulateNode<T extends Record<string, BreadboardType | CodeOutputConfig>>(object: Input<object & JsonSerializable> | OutputPort<JsonSerializable> | InputWithDefault<object & JsonSerializable>, keys: InputWithDefault<string[]>, mode: InputWithDefault<"pick" | "ommit">, strict: InputWithDefault<boolean>, returnType: T) {
    const manip = code(
        {
            $id:"manipulation",
            object,
            keys,
            mode,
            strict
        },
        returnType,
        ({ object, keys, mode, strict }) => {
            const obj = object as object
            if (typeof obj !== "object" || obj == undefined) {
                throw new Error(`object is of type ${typeof obj} not object`);
            }

            if (keys == undefined) {
                throw new Error(`keys undefined`);
            }

            if (mode === "pick") {
                const result: Record<string, unknown> = {};
                keys.forEach((key) => {
                    if (strict && !obj[key as keyof typeof obj]) {
                        throw new Error(`Key "${key}" not found in object`);
                    }
                    result[key] = obj[key as keyof typeof obj];
                });
                return { object: result };
            } else {
                const result = { ...obj };
                keys.forEach((key) => {
                    if (strict && !obj[key as keyof typeof obj]) {
                        throw new Error(`Key "${key}" not found in object`);
                    }
                    delete result[key as keyof typeof obj];
                });
                return { object: result } as any;
            }
        }
    );
    return manip;
}

const inputObject = input({
    type: object({}),
    title: "object",
    description: "The term to search for",
    default: {
        forename: "John",
        surname: "Smith",
        age: 30,
        city: "New York",
    }
})

const mode = input({
    type: enumeration("pick", "ommit"),
    title: "mode",
    description: "pick or ommit mode",
    default: "pick"
})

const strict = input({
    type: "boolean",
    title: "strict",
    description: "strict",
    default: false
})

export const keys = input({type: array("string"), default: ["forename", "surname"] })

const manipulation = createManipulateNode(inputObject, keys, mode, strict, { object: "unknown" })

export default board({
    title: "Object Manip New Syntax",
    version: "0.1.0",
    inputs: {
        object: inputObject,
        keys: keys,
        mode: mode,
        strict: strict
    },
    outputs: { object: output(manipulation.outputs.object) }
})

