export const BreadboardJSX = {
  createBoard: (
		fun: (attrs?: unknown, children?: unknown[]) => unknown,
    attrs: unknown,
    ...children: unknown[]
	): unknown => {
    return fun(attrs, children);
  },
};
