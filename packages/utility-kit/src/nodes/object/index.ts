import { code, Lambda } from "@google-labs/breadboard";

// ## [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

// ### [Static methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#static_methods)

/** [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
 * Copies the values of all enumerable own properties from one or more source objects to a target object.
 * */

/** [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
 * Creates a new object with the specified prototype object and properties.
 * */

//  - [`Object.defineProperties()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
/**
 * defineProperties
 * Adds the named properties described by the given descriptors to an object.
 */
export function defineProperties<T>({
  object,
  properties,
}: {
  object: { [key: string]: T };
  properties: { [key: string]: PropertyDescriptor };
}): {
  object: { [key: string]: T };
} {
  return { object: Object.defineProperties(object, properties) };
}

/** [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
 * Adds the named property described by a given descriptor to an object.
 * */

/** [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
 * Returns an array containing all of the `[key, value]` pairs of a given object's **own** enumerable string properties.
 * */

/**
 * entries
 * Returns an array containing the names of all of the given object's **own** enumerable string properties.
 */
export function entries<T>({ object }: { object: { [key: string]: T } }): {
  entries: [string, T][];
} {
  return { entries: Object.entries(object) };
}

/** [`Object.freeze()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
 * Freezes an object. Other code cannot delete or change its properties.
 * */


/**
 * fromEntries
 * Returns a new object from an iterable of [key, value] pairs. (This is the reverse of Object.entries).
 */
export function fromEntries<T>({ entries }: { entries: [string, T][] }): {
  object: { [key: string]: T };
} {
  return { object: Object.fromEntries(entries) };
}

/** [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
 * Returns a property descriptor for a named property on an object.
 * */

/** [`Object.getOwnPropertyDescriptors()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)
 * Returns an object containing all own property descriptors for an object.
 * */

/** [`Object.getOwnPropertyNames()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
 * Returns an array containing the names of all of the given object's **own** enumerable and non-enumerable properties.
 * */

/** [`Object.getOwnPropertySymbols()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)
 * Returns an array of all symbol properties found directly upon a given object.
 * */

/** [`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
 * Returns the prototype (internal `[[Prototype]]` property) of the specified object.
 * */

/** [`Object.groupBy()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)
 * Groups the elements of a given iterable according to the string values returned by a provided callback function. The returned object has separate properties for each group, containing arrays with the elements in the group.
 * */

/** [`Object.hasOwn()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
 * Returns `true` if the specified object has the indicated property as its _own_ property, or `false` if the property is inherited or does not exist.
 * */

/** [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
 * Compares if two values are the same value. Equates all `NaN` values (which differs from both `IsLooselyEqual` used by [`==`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) and `IsStrictlyEqual` used by [`===`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)).
 * */

/** [`Object.isExtensible()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
 * Determines if extending of an object is allowed.
 * */

/** [`Object.isFrozen()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
 * Determines if an object was frozen.
 * */

/** [`Object.isSealed()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
 * Determines if an object is sealed.
 * */

/**
 * keys
 * Returns an array containing the names of all of the given object's own enumerable string properties.
 */
export function keys<T>({ object }: { object: { [key: string]: T } }): {
  keys: string[];
} {
  return { keys: Object.keys(object) };
}

/** [`Object.preventExtensions()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
 * Prevents any extensions of an object.
 * */

/** [`Object.seal()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
 * Prevents other code from deleting properties of an object.
 * */

/** [`Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
 * Sets the object's prototype (its internal `[[Prototype]]` property).
 * */

// *  [`Object.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
/**
 * values
 * Returns an array containing the values that correspond to all of a given object's **own** enumerable string properties.
 * */
export function values<T>({ object }: { object: { [key: string]: T } }): {
  values: T[];
} {
  return { values: Object.values(object) };
}

// ### [Instance methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#instance_methods)

/** [`Object.prototype.hasOwnProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
 * Returns a boolean indicating whether an object contains the specified property as a direct property of that object and not inherited through the prototype chain.
 * */

/** [`Object.prototype.isPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
 * Returns a boolean indicating whether the object this method is called upon is in the prototype chain of the specified object.
 * */

/** [`Object.prototype.propertyIsEnumerable()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
 * Returns a boolean indicating whether the specified property is the object's [enumerable own](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) property.
 * */

/** [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)
 * Calls [`toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString).
 * */

/** [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
 * Returns a string representation of the object.
 * */

/** [`Object.prototype.valueOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
 * Returns the primitive value of the specified object.
 * */

export const gather: Lambda<
  {
    [key: string]: unknown;
  },
  {
    object: object;
  }
> = code((inputs) => {
  return { object: inputs };
});
export const rest: Lambda<
  {
    key: string;
    object: Record<string, unknown>;
    outputKey?: string;
  },
  {
    [key: string]: unknown;
    rest: Record<string, unknown>;
  }
> = code((inputs) => {
  const { key, object, outputKey = key } = inputs;
  const { [key]: value, ...rest } = object;
  return { [outputKey]: value, rest };
});
export const spread: Lambda<
  {
    object: object;
  },
  {
    [key: string]: unknown;
  }
> = code((inputs) => {
  const object = inputs.object;
  if (typeof object !== "object") {
    throw new Error(`object is of type ${typeof object} not object`);
  }
  return { ...object };
});
