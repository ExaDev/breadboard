export const Board = {
	jsx: (element: string, attr: Record<string, any>, children: any[]) => {
		const obj = {
			[element]: { ...attr, children },
		};
		console.log(JSON.stringify(obj), "obj");
	},
};
