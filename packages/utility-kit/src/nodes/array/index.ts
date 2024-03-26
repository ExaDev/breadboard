import {
  NodeFactoryFromDefinition,
  anyOf,
  array,
  defineNodeType,
} from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";
import { Lambda, addKit, code } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";

// ## [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

// - [`Array.isArray()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
//   - Returns `true` if the argument is an array, or `false` otherwise.

/**
 * isArray - Returns `true` if the argument is an array, or `false` otherwise.
 * @param value - The value to check.
 * @returns `true` if the argument is an array, or `false` otherwise.
 */
export function isArray<T>({ value }: { value: T[] }): {
  isArray: boolean;
} {
  return {
    isArray: Array.isArray(value),
  };
}
export const isArrayNodeType: MonomorphicDefinition<
  {
    value: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    isArray: {
      type: "boolean";
    };
  }
> = defineNodeType({
  inputs: {
    value: {
      type: array("unknown"),
    },
  },
  outputs: {
    isArray: {
      type: "boolean",
    },
  },
  invoke: isArray,
});

// - [`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
//   - Reflects the number of elements in an array.

/**
 * length - Reflects the number of elements in an array.
 * @param array - The array to check.
 * @returns The number of elements in the array.
 */
export function length<T>(inputs: { array: T[] }): {
  length: number;
} {
  const { array } = inputs;
  return {
    length: array.length,
  };
}
export const lengthNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    length: {
      type: "number";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    length: {
      type: "number",
    },
  },
  invoke: length,
});

// ### [Instance methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)

// - [`Array.prototype.at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
//   - Returns the array item at the given index. Accepts negative integers, which count back from the last item.

/**
 *  at
 * Returns the array item at the given index. Accepts negative integers, which count back from the last item.
 * @param array - The array to check.
 * @param index - The index of the item to return.
 * @returns The item at the given index.
 */
export function at<T>(inputs: { array: T[]; index: number }): {
  value: T | undefined;
} {
  const { array, index } = inputs;
  return { value: array.at(index) };
}

export const atNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    index: {
      type: "number";
    };
  },
  {
    value: {
      type: "unknown";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    index: {
      type: "number",
    },
  },
  outputs: {
    value: {
      type: "unknown",
    },
  },
  invoke: at,
});

// - [`Array.prototype.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
//   - Returns a new array that is the calling array joined with other array(s) and/or value(s).

/**
 * concat - Returns a new array that is the calling array joined with other array(s) and/or value(s).
 * @param array - The array to concatenate.
 * @param prepend - The array to prepend.
 * @param append - The array to append.
 * @returns array - The concatenated array.
 */
export function concat<T>({
  array,
  prepend = [],
  append = [],
}: {
  array: T[];
  prepend?: T[];
  append?: T[];
}): {
  array: T[];
} {
  return { array: array.concat(prepend, append) };
}

export const concatNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    prepend: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    append: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    prepend: {
      type: array("unknown"),
    },
    append: {
      type: array("unknown"),
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: concat,
});

// - [`Array.prototype.copyWithin()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
//   - Copies a sequence of array elements within an array.
/**
 * copyWithin
 * Copies a sequence of array elements within an array.
 * @param array - The array to copy within.
 * @param target - The index at which to copy the sequence.
 * @param start - The index at which to start copying elements from.
 * @param end - The index at which to stop copying elements from.
 * @returns array - The array with the copied elements.
 */
export function copyWithin<T>({
  array,
  target,
  start = 0,
  end = array.length,
}: {
  array: T[];
  target: number;
  start?: number;
  end?: number;
}): {
  array: T[];
} {
  return { array: array.copyWithin(target, start, end) };
}
export const copyWithinNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    target: {
      type: "number";
    };
    start: {
      type: "number";
    };
    end: {
      type: "number";
    };
  },
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    target: {
      type: "number",
    },
    start: {
      type: "number",
    },
    end: {
      type: "number",
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: copyWithin,
});

// - [`Array.prototype.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
//   - Returns a new [_array iterator_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) object that contains the key/value pairs for each index in an array.
/**
 * entries
 * Returns a new array iterator object that contains the key/value pairs for each index in an array.
 * @param array - The array to get the entries from.
 * @returns entries - The array iterator object.
 */
export function entries<T>({ array }: { array: T[] }): {
  entries: IterableIterator<[number, T]>;
} {
  return { entries: array.entries() };
}
export const entriesNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    entries: {
      type: "unknown";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    entries: {
      type: "unknown",
    },
  },
  invoke: entries,
});

// - [`Array.prototype.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
//   - Returns `true` if every element in the calling array satisfies the testing function.
/**
 * every
 * Returns `true` if every element in the calling array satisfies the testing function.
 * @param array - The array to check.
 * @param callback - A predicate function to test each element of the array.
 * @returns `true` if every element in the calling array satisfies the testing function.
 */
export function every<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  every: boolean;
} {
  return { every: array.every(predicate) };
}

// - [`Array.prototype.fill()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
//   - Fills all the elements of an array from a start index to an end index with a static value.
/**
 * fill
 * Fills all the elements of an array from a start index to an end index with a static value.
 * @param array - The array to fill.
 * @param value - The value to fill the array with.
 * @param start - The index at which to start filling the array.
 * @param end - The index at which to stop filling the array.
 * @returns array - The filled array.
 */
export function fill<T>({
  array,
  value,
  start = 0,
  end = array.length,
}: {
  array: T[];
  value: T;
  start?: number;
  end?: number;
}): {
  array: T[];
} {
  return { array: array.fill(value, start, end) };
}
export const fillNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: "unknown";
    };
    start: {
      type: "number";
    };
    end: {
      type: "number";
    };
  },
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    value: {
      type: "unknown",
    },
    start: {
      type: "number",
    },
    end: {
      type: "number",
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: fill,
});

// - [`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
//   - Returns a new array containing all elements of the calling array for which the provided filtering function returns `true`.
/**
 * filter
 * Returns a new array containing all elements of the calling array for which the provided filtering function returns `true`.
 * @param array - The array to filter.
 * @param callback - A predicate function to test each element of the array.
 * @returns array - The filtered array.
 */
export function filter<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  array: T[];
} {
  return { array: array.filter(predicate) };
}

// - [`Array.prototype.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
//   - Returns the value of the first element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
/**
 * find
 * Returns the value of the first element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
 * @param array - The array to search.
 * @param callback - A predicate function to test each element of the array.
 * @returns value - The value of the first element that satisfies the testing function.
 */
export function find<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  value: T | undefined;
} {
  return { value: array.find(predicate) };
}

// - [`Array.prototype.findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
//   - Returns the index of the first element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
/**
 * findIndex
 * Returns the index of the first element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
 * @param array - The array to search.
 * @param callback - A predicate function to test each element of the array.
 * @returns index - The index of the first element that satisfies the testing function.
 */
export function findIndex<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  index: number;
} {
  return { index: array.findIndex(predicate) };
}

// - [`Array.prototype.findLast()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)
//   - Returns the value of the last element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
/**
 * findLast
 * Returns the value of the last element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
 * @param array - The array to search.
 * @param callback - A predicate function to test each element of the array.
 * @returns value - The value of the last element that satisfies the testing function.
 */
export function findLast<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  value: T | undefined;
} {
  return { value: array.reverse().find(predicate) };
}

// - [`Array.prototype.findLastIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)
//   - Returns the index of the last element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
/**
 * findLastIndex
 * Returns the index of the last element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
 * @param array - The array to search.
 * @param callback - A predicate function to test each element of the array.
 * @returns index - The index of the last element that satisfies the testing function.
 */
export function findLastIndex<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  index: number;
} {
  return { index: array.reverse().findIndex(predicate) };
}

// - [`Array.prototype.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
//   - Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
/**
 * flat
 * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @param array - The array to flatten.
 * @param depth - The depth to flatten the array.
 * @returns array - The flattened array.
 */
export function flat<T>({ array, depth = 1 }: { array: T[]; depth?: number }): {
  array: FlatArray<
    T,
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
  >[];
} {
  return { array: array.flat(depth) };
}
export const flatNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    depth: {
      type: "number";
    };
  },
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    depth: {
      type: "number",
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: flat,
});

// - [`Array.prototype.flatMap()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
//   - Returns a new array formed by applying a given callback function to each element of the calling array, and then flattening the result by one level.
/**
 * flatMap
 * Returns a new array formed by applying a given callback function to each element of the calling array, and then flattening the result by one level.
 * @param array - The array to map.
 * @param callback - A function that produces an element of the new array.
 * @returns array - The mapped array.
 */
export function flatMap<T, U>({
  array,
  callbackFn, // TODO: add type for callbackFn
}: {
  array: T[];
  callbackFn: (value: T, index: number, array: T[]) => U[];
}): {
  array: U[];
} {
  return { array: array.flatMap(callbackFn) };
}

// - [`Array.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
//   - Calls a function for each element in the calling array.
/**
 * forEach
 * Calls a function for each element in the calling array.
 * @param array - The array to iterate over.
 * @param callback - A function to call for each element.
 */
export function forEach<T>({
  array,
  callbackFn, // TODO: add type for callbackFn
}: {
  array: T[];
  callbackFn: (value: T, index: number, array: T[]) => void;
}): void {
  array.forEach(callbackFn);
}

// - [`Array.prototype.includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
//   - Determines whether the calling array contains a value, returning `true` or `false` as appropriate.
/**
 * includes
 * Determines whether the calling array contains a value, returning `true` or `false` as appropriate.
 * @param array - The array to check.
 * @param value - The value to search for.
 * @returns `true` if the value is found, `false` otherwise.
 */
export function includes<T>({ array, value }: { array: T[]; value: T }): {
  includes: boolean;
} {
  return { includes: array.includes(value) };
}
export const includesNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: "unknown";
    };
  },
  {
    includes: {
      type: "boolean";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    value: {
      type: "unknown",
    },
  },
  outputs: {
    includes: {
      type: "boolean",
    },
  },
  invoke: includes,
});

// - [`Array.prototype.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
//   - Returns the first (least) index at which a given element can be found in the calling array.
/**
 * indexOf
 * Returns the first (least) index at which a given element can be found in the calling array.
 * @param array - The array to search.
 * @param value - The value to search for.
 * @returns index - The index of the first occurrence of the value.
 */
export function indexOf<T>({ array, value }: { array: T[]; value: T }): {
  index: number;
} {
  return { index: array.indexOf(value) };
}
export const indexOfNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: "unknown";
    };
  },
  {
    index: {
      type: "number";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    value: {
      type: "unknown",
    },
  },
  outputs: {
    index: {
      type: "number",
    },
  },
  invoke: indexOf,
});

// - [`Array.prototype.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
//   - Joins all elements of an array into a string.
/**
 * join
 * Joins all elements of an array into a string.
 * @param array - The array to join.
 * @param separator - The string to separate each element.
 * @returns string - The joined string.
 */
export function join<T>({
  array,
  separator = ",",
}: {
  array: T[];
  separator?: string;
}): {
  string: string;
} {
  return { string: array.join(separator) };
}

// - [`Array.prototype.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
//   - Returns a new [_array iterator_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) that contains the keys for each index in the calling array.
/**
 * keys
 * Returns a new array iterator that contains the keys for each index in the calling array.
 * @param array - The array to get the keys from.
 * @returns keys - The array iterator object.
 */
export function keys<T>({ array }: { array: T[] }): {
  keys: IterableIterator<number>;
} {
  return { keys: array.keys() };
}
export const keysNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    keys: {
      type: "unknown";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    keys: {
      type: "unknown",
    },
  },
  invoke: keys,
});

// - [`Array.prototype.lastIndexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
//   - Returns the last (greatest) index at which a given element can be found in the calling array, or `-1` if none is found.
/**
 * lastIndexOf
 * Returns the last (greatest) index at which a given element can be found in the calling array, or `-1` if none is found.
 * @param array - The array to search.
 * @param value - The value to search for.
 * @returns index - The index of the last occurrence of the value.
 */
export function lastIndexOf<T>({ array, value }: { array: T[]; value: T }): {
  index: number;
} {
  return { index: array.lastIndexOf(value) };
}
export const lastIndexOfNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: "unknown";
    };
  },
  {
    index: {
      type: "number";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    value: {
      type: "unknown",
    },
  },
  outputs: {
    index: {
      type: "number",
    },
  },
  invoke: lastIndexOf,
});

// - [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
//   - Returns a new array containing the results of invoking a function on every element in the calling array.
/**
 * map
 * Returns a new array containing the results of invoking a function on every element in the calling array.
 * @param array - The array to map.
 * @param callback - A function to call for each element.
 * @returns array - The mapped array.
 */
export function map<T, U>({
  array,
  callbackFn,
}: {
  array: T[];
  callbackFn: (value: T, index: number, array: T[]) => U;
}): {
  array: U[];
} {
  return { array: array.map(callbackFn) };
}

// - [`Array.prototype.pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
//   - Removes the last element from an array and returns that element.
/**
 * pop
 * Removes the last element from an array and returns that element.
 * @param array - The array to pop.
 * @returns last - The last element of the array.
 */
export function pop<T>(inputs: { array: T[] }): {
  last: T | undefined;
  array: T[];
} {
  const { array } = inputs;
  const last = array.pop();
  return {
    last,
    array,
  };
}
export const popNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    last: {
      type: "unknown";
    };
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    last: {
      type: "unknown",
    },
    array: {
      type: array("unknown"),
    },
  },
  invoke: pop,
});

// - [`Array.prototype.push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
//   - Adds one or more elements to the end of an array, and returns the new `length` of the array.
/**
 * push
 * Adds one or more elements to the end of an array, and returns the new `length` of the array.
 * @param array - The array to push.
 * @param elements - The elements to add.
 * @returns array - The array with the added elements.
 */
export function push<T>({
  array,
  elements,
}: {
  array: T[];
  elements: T | T[];
}): {
  array: T[];
} {
  return { array: array.concat(elements) };
}
export const pushNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    elements: {
      type: AdvancedBreadboardType<unknown | unknown[]>;
    };
  },
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    elements: {
      type: anyOf("unknown", array("unknown")),
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: push,
});

// - [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
//   - Executes a user-supplied "reducer" callback function on each element of the array (from left to right), to reduce it to a single value.
/**
 * reduce
 * Executes a user-supplied "reducer" callback function on each element of the array (from left to right), to reduce it to a single value.
 * @param array - The array to reduce.
 * @param callback - A function to execute on each element.
 * @param initialValue - The initial value to use.
 * @returns value - The reduced value.
 */
export function reduce<T, U>({
  array,
  callbackFn, // TODO: add type for callback
  initialValue,
}: {
  array: T[];
  callbackFn: (accumulator: U, value: T, index: number, array: T[]) => U;
  initialValue: U;
}): {
  value: U;
} {
  return { value: array.reduce(callbackFn, initialValue) };
}

// - [`Array.prototype.reduceRight()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)
//   - Executes a user-supplied "reducer" callback function on each element of the array (from right to left), to reduce it to a single value.
/**
 * reduceRight
 * Executes a user-supplied "reducer" callback function on each element of the array (from right to left), to reduce it to a single value.
 * @param array - The array to reduce.
 * @param callback - A function to execute on each element.
 * @param initialValue - The initial value to use.
 * @returns value - The reduced value.
 */
export function reduceRight<T, U>({
  array,
  callbackFn, // TODO: add type for callback
  initialValue,
}: {
  array: T[];
  callbackFn: (accumulator: U, value: T, index: number, array: T[]) => U;
  initialValue: U;
}): {
  value: U;
} {
  return { value: array.reduceRight(callbackFn, initialValue) };
}

// - [`Array.prototype.reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
//   - Reverses the order of the elements of an array _in place_. (First becomes the last, last becomes first.)
/**
 * reverse
 * Reverses the order of the elements of an array _in place_. (First becomes the last, last becomes first.)
 * @param array - The array to reverse.
 * @returns array - The reversed array.
 */
export function reverse<T>({ array }: { array: T[] }): {
  array: T[];
} {
  return { array: array.reverse() };
}
export const reverseNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: reverse,
});

// - [`Array.prototype.shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
//   - Removes the first element from an array and returns that element.
/**
 * shift
 * Removes the first element from an array and returns that element.
 * @param array - The array to shift.
 * @returns first - The first element of the array.
 */
export function shift<T>(inputs: { array: T[] }): {
  first: T | undefined;
  array: T[];
} {
  const { array } = inputs;
  const first = array.shift();
  return {
    first,
    array,
  };
}
export const shiftNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    first: {
      type: "unknown";
    };
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    first: {
      type: "unknown",
    },
    array: {
      type: array("unknown"),
    },
  },
  invoke: shift,
});

// - [`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
//   - Extracts a section of the calling array and returns a new array.
/**
 * slice
 * Extracts a section of the calling array and returns a new array.
 * @param array - The array to slice.
 * @param start - The index at which to begin extraction.
 * @param end - The index at which to end extraction.
 * @returns array - The sliced array.
 */
export function slice<T>({
  array,
  start = 0,
  end = array.length,
}: {
  array: T[];
  start?: number;
  end?: number;
}): {
  array: T[];
} {
  return { array: array.slice(start, end) };
}
export const sliceNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    start: {
      type: "number";
    };
    end: {
      type: "number";
    };
  },
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    start: {
      type: "number",
    },
    end: {
      type: "number",
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: slice,
});

// - [`Array.prototype.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
//   - Returns `true` if at least one element in the calling array satisfies the provided testing function.
/**
 * some
 * Returns `true` if at least one element in the calling array satisfies the provided testing function.
 * @param array - The array to check.
 * @param callback - A predicate function to test each element of the array.
 * @returns `true` if at least one element in the calling array satisfies the testing function.
 */
export function some<T>({
  array,
  callback: predicate, // TODO: add type for callback
}: {
  array: T[];
  callback: (value: T, index: number, array: T[]) => boolean;
}): {
  some: boolean;
} {
  return { some: array.some(predicate) };
}

// - [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
//   - Sorts the elements of an array in place and returns the array.

/**
 * sort
 * Sorts the elements of an array in place and returns the array.
 * @param array - The array to sort.
 * @param compareFunction - A function that defines the sort order.
 * @returns array - The sorted array.
 */
export function sort<T>({
  array,
  compareFunction: compareFn,
}: {
  array: T[];
  compareFunction?: (a: T, b: T) => number;
}): {
  array: T[];
} {
  return { array: array.sort(compareFn) };
}

// - [`Array.prototype.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
//   - Adds and/or removes elements from an array.
/**
 * splice
 * Adds and/or removes elements from an array.
 * @param array - The array to splice.
 * @param start - The index at which to start changing the array.
 * @param deleteCount - The number of elements to remove.
 * @param elements - The elements to add.
 * @returns array - The spliced array.
 */
export function splice<T>({
  array,
  start,
  deleteCount = 0,
  elements = [],
}: {
  array: T[];
  start: number;
  deleteCount?: number;
  elements?: T[];
}): {
  array: T[];
} {
  return { array: array.splice(start, deleteCount, ...elements) };
}

// - [`Array.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
//   - Returns a localized string representing the calling array and its elements. Overrides the [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString) method.
/**
 * toLocaleString
 * Returns a localized string representing the calling array and its elements. Overrides the `Object.prototype.toLocaleString()` method.
 * @param array - The array to convert.
 * @returns string - The localized string.
 */
export function toLocaleString<T>({ array }: { array: T[] }): {
  string: string;
} {
  return { string: array.toLocaleString() };
}

// - [`Array.prototype.toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
//   - Returns a new array with the elements sorted in ascending order, without modifying the original array.

// - [`Array.prototype.toSpliced()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)
//   - Returns a new array with some elements removed and/or replaced at a given index, without modifying the original array.

// - [`Array.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
//   - Returns a string representing the calling array and its elements. Overrides the [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) method.
/**
 * 	toString
 * Returns a string representing the calling array and its elements. Overrides the `Object.prototype.toString()` method.
 * @param array - The array to convert.
 * @returns string - The string representation of the array.
 */
export function toString<T>({ array }: { array: T[] }): {
  string: string;
} {
  return { string: array.toString() };
}

// - [`Array.prototype.unshift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
//   - Adds one or more elements to the front of an array, and returns the new `length` of the array.
/**
 * unshift
 * Adds one or more elements to the front of an array, and returns the new `length` of the array.
 * @param array - The array to unshift.
 * @param elements - The elements to add.
 * @returns array - The array with the added elements.
 */
export function unshift<T>({
  array,
  elements,
}: {
  array: T[];
  elements: T[];
}): {
  array: T[];
} {
  array.unshift(...elements);
  return { array };
}

export const unshiftNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    elements: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    elements: {
      type: array("unknown"),
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: unshift,
});

export const unshiftCode: Lambda<
  {
    array: unknown[];
    elements: unknown[];
  },
  {
    array: unknown[];
  }
> = code(({ array, elements }) => unshift({ array, elements }));

// - [`Array.prototype.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)
//   - Returns a new [_array iterator_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) object that contains the values for each index in the array.
/**
 * values
 * Returns a new array iterator object that contains the values for each index in the array.
 * @param array - The array to get the values from.
 * @returns values - The array iterator object.
 */
export function values<T>({ array }: { array: T[] }): {
  values: IterableIterator<T>;
} {
  return { values: array.values() };
}
export const valuesNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    values: {
      type: "unknown";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    values: {
      type: "unknown",
    },
  },
  invoke: values,
});

// - [`Array.prototype.with()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with)
//   - Returns a new array with the element at the given index replaced with the given value, without modifying the original array.
/**
 * with
 * Returns a new array with the element at the given index replaced with the given value, without modifying the original array.
 * @param array - The array to modify.
 * @param index - The index of the element to replace.
 * @param value - The value to replace the element with.
 * @returns array - The modified array.
 */
export function withValue<T>({
  array,
  index,
  value,
}: {
  array: T[];
  index: number;
  value: T;
}): {
  array: T[];
} {
  const newArray = array.slice();
  newArray[index] = value;
  return { array: newArray };
}

////////////////////////////////////////////////////////////////////////////////
const ArrayKit = new KitBuilder({
  title: "Example Kit",
  description: "An example kit",
  version: "0.1.0",
  url: "npm:@breadboard-ai/example-kit",
}).build({
  at: atNodeType,
  pop: popNodeType,
  isArray: isArrayNodeType,
  length: lengthNodeType,
  concat: concatNodeType,
  copyWithin: copyWithinNodeType,
  entries: entriesNodeType,
  // every: everyNodeType,
  fill: fillNodeType,
  // filter: filterNodeType,
  // find: findNodeType,
  // findIndex: findIndexNodeType,
  // findLast: findLastNodeType,
  // findLastIndex: findLastIndexNodeType,
  flat: flatNodeType,
  // flatMap: flatMapNodeType,
  // forEach: forEachNodeType,
  includes: includesNodeType,
  indexOf: indexOfNodeType,
  // join: joinNodeType,
  keys: keysNodeType,
  lastIndexOf: lastIndexOfNodeType,
  // map: mapNodeType,
  push: pushNodeType,
  // reduce: reduceNodeType,
  // reduceRight: reduceRightNodeType,
  reverse: reverseNodeType,
  shift: shiftNodeType,
  slice: sliceNodeType,
  // some: someNodeType,
  // sort: sortNodeType,
  // splice: spliceNodeType,
  // toLocaleString: toLocaleStringNodeType,
  // toString: toStringNodeType,
  unshift: unshiftNodeType,
  values: valuesNodeType,
  // with: withNodeType
});

export default ArrayKit;

export const ArrayKitNodes = addKit(ArrayKit) as {
  at: NodeFactoryFromDefinition<typeof atNodeType>;
  isArray: NodeFactoryFromDefinition<typeof isArrayNodeType>;
  pop: NodeFactoryFromDefinition<typeof popNodeType>;
  length: NodeFactoryFromDefinition<typeof lengthNodeType>;
  concat: NodeFactoryFromDefinition<typeof concatNodeType>;
  copyWithin: NodeFactoryFromDefinition<typeof copyWithinNodeType>;
  entries: NodeFactoryFromDefinition<typeof entriesNodeType>;
  // every: NodeFactoryFromDefinition<typeof everyNodeType>;
  fill: NodeFactoryFromDefinition<typeof fillNodeType>;
  // filter: NodeFactoryFromDefinition<typeof filterNodeType>;
  // find: NodeFactoryFromDefinition<typeof findNodeType>;
  // findIndex: NodeFactoryFromDefinition<typeof findIndexNodeType>;
  // findLast: NodeFactoryFromDefinition<typeof findLastNodeType>;
  // findLastIndex: NodeFactoryFromDefinition<typeof findLastIndexNodeType>;
  flat: NodeFactoryFromDefinition<typeof flatNodeType>;
  // flatMap: NodeFactoryFromDefinition<typeof flatMapNodeType>;
  // forEach: NodeFactoryFromDefinition<typeof forEachNodeType>;
  includes: NodeFactoryFromDefinition<typeof includesNodeType>;
  indexOf: NodeFactoryFromDefinition<typeof indexOfNodeType>;
  // join: NodeFactoryFromDefinition<typeof joinNodeType>;
  keys: NodeFactoryFromDefinition<typeof keysNodeType>;
  lastIndexOf: NodeFactoryFromDefinition<typeof lastIndexOfNodeType>;
  // map: NodeFactoryFromDefinition<typeof mapNodeType>;
  push: NodeFactoryFromDefinition<typeof pushNodeType>;
  // reduce: NodeFactoryFromDefinition<typeof reduceNodeType>;
  // reduceRight: NodeFactoryFromDefinition<typeof reduceRightNodeType>;
  reverse: NodeFactoryFromDefinition<typeof reverseNodeType>;
  shift: NodeFactoryFromDefinition<typeof shiftNodeType>;
  slice: NodeFactoryFromDefinition<typeof sliceNodeType>;
  // some: NodeFactoryFromDefinition<typeof someNodeType>;
  // sort: NodeFactoryFromDefinition<typeof sortNodeType>;
  // splice: NodeFactoryFromDefinition<typeof spliceNodeType>;
  // toLocaleString: NodeFactoryFromDefinition<typeof toLocaleStringNodeType>;
  // toString: NodeFactoryFromDefinition<typeof toStringNodeType>;
  unshift: NodeFactoryFromDefinition<typeof unshiftNodeType>;
  values: NodeFactoryFromDefinition<typeof valuesNodeType>;
  // with: NodeFactoryFromDefinition<typeof withNodeType>;
};
