export * as nodes from "./nodes/index.js";

// function doSomething({
//   inputKey = "input",
//   outputKey = "output",
//   ...inputs
// }: {
//   inputKey?: string;
//   outputKey?: string;
//   [k: string]: unknown;
// }): unknown {
//   return {
//     [outputKey]: inputs[inputKey],
//   };
// }

// function doSomething<T extends Record<string, I>, I= unknown>({
//   inputKey = "input",
//   outputKey = "output",
//   ...inputs
// }: {
//   inputKey?: string;
//   outputKey?: string;
// } & T): Record<string, I> {
//   return {
//     [outputKey]: inputs[inputKey],
//   };
// }

// function doSomething<T extends Record<string, I>, I extends keyof T>({
//   inputKey = "input",
//   outputKey = "output",
//   ...inputs
// }: {
//   inputKey?: string;
//   outputKey?: string;
// } & T): Record<string, keyof T> {
//   return {
//     [outputKey]: inputs[inputKey],
//   };
// }

// doSomething({ input: "value", output: "value" });

function doSomething<T extends Record<string, I>, I>({
  inputKey = "input",
  outputKey = "output",
  ...rest
}: {
  inputKey?: string;
  outputKey?: string;
} & T): Record<string, I> {
  // Ensure inputKey exists in the input object to prevent runtime errors
  if (!(inputKey in rest)) {
    throw new Error(`Input key "${inputKey}" not found in input object.`);
  }

  return {
    [outputKey]: rest[inputKey],
  };
}

// Example usage:
const result = doSomething({
  input: "value",
  outputKey: "out",
});
console.log(result);

