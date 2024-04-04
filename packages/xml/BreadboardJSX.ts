
type func = (...args: unknown[]) => unknown;

export const BreadboardJSX = {
  createBoard: (
		fun: func,
    attrs?: unknown,
    ...children: unknown[]
	): unknown => {
    const attributeArray = [];
    if (attrs) {
      attributeArray.push(attrs);
    }
    if (children) {
      attributeArray.push(children);
    }
    return fun(...attributeArray);
  },
};
