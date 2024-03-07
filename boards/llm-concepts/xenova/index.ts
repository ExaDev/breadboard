import {board, code, asRuntimeKit, BoardRunner} from "@google-labs/breadboard";
import { Core } from "@google-labs/core-kit";
import { pipeline } from "@xenova/transformers";
const myMessage = `Dogs are an amazing part of life and can bring joy to your whole family, but when your little fur ball gets hurt or sick it can be a scary time. In this article I will be looking at the 9 healthiest dog breeds and how they made the list.
Though these breeds are proven to be resilient there can still be complications as all dogs are different. If you are getting a dog from a breeder make sure it is a reputable one and if you are adopting contact your veterinarian to get your dog checked out. No dogs will be 100% healthy their entire life but this list of dogs can hold their own.`

 // dynamic import
const xenovaPipe = code(async ({ message }) => {
    const output = await import("@xenova/transformers").then(async xenova => {
        const pipe = await xenova.pipeline('sentiment-analysis', 'Xenova/bert-base-multilingual-uncased-sentiment')

        return await pipe(message as string)
    })

    return { output }
});

const xenovaPipe2 = code(async ({ message }) => {
    const pipe = await pipeline('sentiment-analysis', 'Xenova/bert-base-multilingual-uncased-sentiment')
    const output = await pipe(message as string)
  
    return { output }
});

const test = code(async ({ message }) => {
    const output = "ok"
  
    return { output }
});


const myBoard = board(({ message }) => {
    const { output } = xenovaPipe2(message)
    return { output };
});

console.log("output code node only", JSON.stringify(await myBoard({ message: myMessage }), null, 2));

// const serializedBoard = await myBoard.serialize({
//     title: "Xenova Code Node Board",
//     description: "Board which performs sentiment analysis using xenova LLM",
// })

// const runner = await BoardRunner.fromGraphDescriptor(serializedBoard);
// const result = await runner.runOnce({ message: myMessage }, { kits: [asRuntimeKit(Core)] })

// console.log(
// 	JSON.stringify(result, null, 2)
// );