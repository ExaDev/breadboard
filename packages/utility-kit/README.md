# Utility Kit

Nodes that perform various utility functions.
Including ones that align with the Javascript [standard built-in objects'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) methods.

## [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### [Static methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#static_methods)

- [`Array.from()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
  - Creates a new `Array` instance from an iterable or array-like object.
- [`Array.fromAsync()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync)
  - Creates a new `Array` instance from an async iterable, iterable, or array-like object.
- [`Array.isArray()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
  - Returns `true` if the argument is an array, or `false` otherwise.
- [`Array.of()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of)
  - Creates a new `Array` instance with a variable number of arguments, regardless of number or type of the arguments.

### [Instance properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_properties)

- [`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  - Reflects the number of elements in an array.

### [Instance methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)

- [`Array.prototype.at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
  - Returns the array item at the given index. Accepts negative integers, which count back from the last item.
- [`Array.prototype.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
  - Returns a new array that is the calling array joined with other array(s) and/or value(s).
- [`Array.prototype.copyWithin()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
  - Copies a sequence of array elements within an array.
- [`Array.prototype.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
  - Returns a new [_array iterator_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) object that contains the key/value pairs for each index in an array.
- [`Array.prototype.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
  - Returns `true` if every element in the calling array satisfies the testing function.
- [`Array.prototype.fill()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
  - Fills all the elements of an array from a start index to an end index with a static value.
- [`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
  - Returns a new array containing all elements of the calling array for which the provided filtering function returns `true`.
- [`Array.prototype.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
  - Returns the value of the first element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
- [`Array.prototype.findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
  - Returns the index of the first element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
- [`Array.prototype.findLast()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)
  - Returns the value of the last element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
- [`Array.prototype.findLastIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)
  - Returns the index of the last element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
- [`Array.prototype.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
  - Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
- [`Array.prototype.flatMap()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
  - Returns a new array formed by applying a given callback function to each element of the calling array, and then flattening the result by one level.
- [`Array.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
  - Calls a function for each element in the calling array.
- [`Array.prototype.includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
  - Determines whether the calling array contains a value, returning `true` or `false` as appropriate.
- [`Array.prototype.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
  - Returns the first (least) index at which a given element can be found in the calling array.
- [`Array.prototype.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
  - Joins all elements of an array into a string.
- [`Array.prototype.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
  - Returns a new [_array iterator_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) that contains the keys for each index in the calling array.
- [`Array.prototype.lastIndexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
  - Returns the last (greatest) index at which a given element can be found in the calling array, or `-1` if none is found.
- [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
  - Returns a new array containing the results of invoking a function on every element in the calling array.
- [`Array.prototype.pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
  - Removes the last element from an array and returns that element.
- [`Array.prototype.push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
  - Adds one or more elements to the end of an array, and returns the new `length` of the array.
- [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
  - Executes a user-supplied "reducer" callback function on each element of the array (from left to right), to reduce it to a single value.
- [`Array.prototype.reduceRight()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)
  - Executes a user-supplied "reducer" callback function on each element of the array (from right to left), to reduce it to a single value.
- [`Array.prototype.reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
  - Reverses the order of the elements of an array _in place_. (First becomes the last, last becomes first.)
- [`Array.prototype.shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
  - Removes the first element from an array and returns that element.
- [`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  - Extracts a section of the calling array and returns a new array.
- [`Array.prototype.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
  - Returns `true` if at least one element in the calling array satisfies the provided testing function.
- [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
  - Sorts the elements of an array in place and returns the array.
- [`Array.prototype.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
  - Adds and/or removes elements from an array.
- [`Array.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
  - Returns a localized string representing the calling array and its elements. Overrides the [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString) method.
- [`Array.prototype.toReversed()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)
  - Returns a new array with the elements in reversed order, without modifying the original array.
- [`Array.prototype.toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
  - Returns a new array with the elements sorted in ascending order, without modifying the original array.
- [`Array.prototype.toSpliced()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)
  - Returns a new array with some elements removed and/or replaced at a given index, without modifying the original array.
- [`Array.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
  - Returns a string representing the calling array and its elements. Overrides the [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) method.
- [`Array.prototype.unshift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
  - Adds one or more elements to the front of an array, and returns the new `length` of the array.
- [`Array.prototype.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)
  - Returns a new [_array iterator_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) object that contains the values for each index in the array.
- [`Array.prototype.with()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with)
  - Returns a new array with the element at the given index replaced with the given value, without modifying the original array.
- [`Array.prototype[@@iterator]()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator)
  - An alias for the [`values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values) method by default.

## [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

### [Static methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#static_methods)

- [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  - Copies the values of all enumerable own properties from one or more source objects to a target object.
- [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  - Creates a new object with the specified prototype object and properties.
- [`Object.defineProperties()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
  - Adds the named properties described by the given descriptors to an object.
- [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
  - Adds the named property described by a given descriptor to an object.
- [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
  - Returns an array containing all of the `[key, value]` pairs of a given object's **own** enumerable string properties.
- [`Object.freeze()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
  - Freezes an object. Other code cannot delete or change its properties.
- [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
  - Returns a new object from an iterable of `[key, value]` pairs. (This is the reverse of [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)).
- [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
  - Returns a property descriptor for a named property on an object.
- [`Object.getOwnPropertyDescriptors()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)
  - Returns an object containing all own property descriptors for an object.
- [`Object.getOwnPropertyNames()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
  - Returns an array containing the names of all of the given object's **own** enumerable and non-enumerable properties.
- [`Object.getOwnPropertySymbols()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)
  - Returns an array of all symbol properties found directly upon a given object.
- [`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
  - Returns the prototype (internal `[[Prototype]]` property) of the specified object.
- [`Object.groupBy()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)
  - Groups the elements of a given iterable according to the string values returned by a provided callback function. The returned object has separate properties for each group, containing arrays with the elements in the group.
- [`Object.hasOwn()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
  - Returns `true` if the specified object has the indicated property as its _own_ property, or `false` if the property is inherited or does not exist.
- [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
  - Compares if two values are the same value. Equates all `NaN` values (which differs from both `IsLooselyEqual` used by [`==`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) and `IsStrictlyEqual` used by [`===`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)).
- [`Object.isExtensible()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
  - Determines if extending of an object is allowed.
- [`Object.isFrozen()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
  - Determines if an object was frozen.
- [`Object.isSealed()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
  - Determines if an object is sealed.
- [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
  - Returns an array containing the names of all of the given object's **own** enumerable string properties.
- [`Object.preventExtensions()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
  - Prevents any extensions of an object.
- [`Object.seal()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
  - Prevents other code from deleting properties of an object.
- [`Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
  - Sets the object's prototype (its internal `[[Prototype]]` property).
- [`Object.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
  - Returns an array containing the values that correspond to all of a given object's **own** enumerable string properties.

### [Instance methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#instance_methods)

- [`Object.prototype.hasOwnProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  - Returns a boolean indicating whether an object contains the specified property as a direct property of that object and not inherited through the prototype chain.
- [`Object.prototype.isPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
  - Returns a boolean indicating whether the object this method is called upon is in the prototype chain of the specified object.
- [`Object.prototype.propertyIsEnumerable()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
  - Returns a boolean indicating whether the specified property is the object's [enumerable own](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) property.
- [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)
  - Calls [`toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString).
- [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
  - Returns a string representation of the object.
- [`Object.prototype.valueOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
  - Returns the primitive value of the specified object.
