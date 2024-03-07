import {board, code} from "@google-labs/breadboard";
 // /workspaces/breadboard/node_modules
 // "../../../../node_modules/@xenova/transformers"

 // dynamic import
const xenovaPipe = code(async ({ message }) => {
    // @ts-expect-error bad
    const output = await import("https://esm.sh/@xenova/transformers").then(async xenova => {
        const pipe = await xenova.pipeline('sentiment-analysis', 'Xenova/bert-base-multilingual-uncased-sentiment')

        return await pipe(message as string)
    })
    
    return { output }
});


export default await board(({ message }) => {
    const { output } =  xenovaPipe(message)
    return { output };
}).serialize({
    title: "Xenova",
    description: "xenova",
    version: "0.0.2",
  });

