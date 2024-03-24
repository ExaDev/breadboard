import assert from "node:assert";
import { describe, test } from "node:test";
import { at } from "../src/nodes/array/at.js";
import { concat } from "../src/nodes/array/concat.js";
import { copyWithin } from "../src/nodes/array/copyWithin.js";
import { entries } from "../src/nodes/array/entries.js";
import { fill } from "../src/nodes/array/fill.js";

// https://www.w3schools.com/jsref/jsref_obj_array.asp
describe("array", async () => {
  // at()	Returns an indexed element of an array
  test("at", async () => {
    const array = [1, 2, 3];
    const index = 1;
    const nativeAtResult = array[index];
    const nodeAtResult = await at().invoke({ array, index });
    assert.deepEqual(nodeAtResult, { value: nativeAtResult });
  });
  // concat()	Joins arrays and returns an array with the joined arrays
  test("concat", async () => {
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    const nativeConcatResult = array1.concat(array2);
    const nodeConcatResult = await concat().invoke({ array1, array2 });
    assert.deepEqual(nodeConcatResult, { array: nativeConcatResult });
  });

  // constructor	Returns the function that created the Array object's prototype
  // copyWithin()	Copies array elements within the array, to and from specified positions
  test("copyWithin", async () => {
    const array = [1, 2, 3, 4, 5];
    const nativeCopyWithinResult = array.copyWithin(0, 3);
    const nodeCopyWithinResult = await copyWithin().invoke({
      array,
      target: 0,
      start: 3,
    });
    assert.deepEqual(nodeCopyWithinResult, { array: nativeCopyWithinResult });
  });

  // entries()	Returns a key/value pair Array Iteration Object
  test("entries", async () => {
    const array = [1, 2, 3];
    const nativeEntriesResult = array.entries();
    const nodeEntriesResult = await entries().invoke({ array });
    assert.deepEqual(nodeEntriesResult, { entries: nativeEntriesResult });
  });

  // every()	Checks if every element in an array pass a test
  // fill()	Fill the elements in an array with a static value
  test("fill", async () => {
    const array = [1, 2, 3, 4];
    const nativeFillResult = array.fill(0, 2, 4);
    const nodeFillResult = await fill().invoke({
      array,
      value: 0,
      start: 2,
      end: 4,
    });
    assert.deepEqual(nodeFillResult, { array: nativeFillResult });
  });

  // filter()	Creates a new array with every element in an array that pass a test
  // find()	Returns the value of the first element in an array that pass a test
  // findIndex()	Returns the index of the first element in an array that pass a test
  // findLast()	Returns the value of the last element in an array that pass a test
  // findLastIndex()	Returns the index of the last element in an array that pass a test
  // flat()	Concatenates sub-array elements
  // flatMap()	Maps all array elements and creates a new flat array
  // forEach()	Calls a function for each array element
  // from()	Creates an array from an object
  // includes()	Check if an array contains the specified element
  // indexOf()	Search the array for an element and returns its position
  // isArray()	Checks whether an object is an array
  // join()	Joins all elements of an array into a string
  // keys()	Returns a Array Iteration Object, containing the keys of the original array
  // lastIndexOf()	Search the array for an element, starting at the end, and returns its position
  // length	Sets or returns the number of elements in an array
  // map()	Creates a new array with the result of calling a function for each array element
  // of()	Creates an array from a number of arguments
  // pop()	Removes the last element of an array, and returns that element
  // prototype	Allows you to add properties and methods to an Array object
  // push()	Adds new elements to the end of an array, and returns the new length
  // reduce()	Reduce the values of an array to a single value (going left-to-right)
  // reduceRight()	Reduce the values of an array to a single value (going right-to-left)
  // reverse()	Reverses the order of the elements in an array
  // shift()	Removes the first element of an array, and returns that element
  // slice()	Selects a part of an array, and returns the new array
  // some()	Checks if any of the elements in an array pass a test
  // sort()	Sorts the elements of an array
  // splice()	Adds/Removes elements from an array
  // toString()	Converts an array to a string, and returns the result
  // unshift()	Adds new elements to the beginning of an array, and returns the new length
  // valueOf()	Returns the primitive value of an array
  // with()	Returns a new array with updated elements
});
