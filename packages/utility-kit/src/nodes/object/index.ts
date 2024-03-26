import { code, Lambda } from "@google-labs/breadboard";

export const objectEntries: Lambda<
	{
		object: { [key: string]: unknown };
	},
	{
		entries: [string, unknown][];
	}
> = code((inputs) => {
	const object = inputs.object;
	if (typeof object !== "object") {
		throw new Error(`object is of type ${typeof object} not object`);
	}
	return {entries: Object.entries(object)};
});
export const fromEntries: Lambda<
	{
		entries: [string, unknown][];
	},
	{ [key: string]: unknown }
> = code((inputs) => {
	const entries = inputs.entries;
	if (!Array.isArray(entries)) {
		throw new Error(`entries is of type ${typeof entries} not array`);
	}
	return Object.fromEntries(entries);
});
export const gather: Lambda<
	{
		[key: string]: unknown;
	},
	{
		object: object;
	}
> = code((inputs) => {
	return {object: inputs};
});
export const keys: Lambda<
	{
		object: object;
	},
	{
		keys: string[];
	}
> = code((inputs) => {
	const object = inputs.object;
	if (typeof object !== "object") {
		throw new Error(`object is of type ${typeof object} not object`);
	}
	return {keys: Object.keys(object)};
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
	const {key, object, outputKey = key} = inputs;
	const {[key]: value, ...rest} = object;
	return {[outputKey]: value, rest};
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
	return {...object};
});
export const values: Lambda<
	{
		object: object;
	},
	{
		values: unknown[];
	}
> = code((inputs) => {
	const object = inputs.object;
	if (typeof object !== "object") {
		throw new Error(`object is of type ${typeof object} not object`);
	}
	return {values: Object.values(object)};
});