import { useState } from "react";
import "./App.css";
//import { BreadboardTypes } from "./breadboard-web-exports";
import board from "./breadboard";
//import BoardListWrapper from "./components/BoardList";
//import BoardItemWrapper from "./components/BoardItem";
import BoardController from "./BoardController";

function App() {
  const [outputMessage, setOutputMessage] = useState<string | undefined>("");

  //const boards: BreadboardTypes.Board[] = [];

  const onSubmit = async () => {
    const boardRun = await board.runOnce({
      message: "Hello Breadboard!",
    });
    setOutputMessage(JSON.stringify(boardRun["output"], null));
  };

  return (
    <>
      <BoardController onSubmit={onSubmit} />
      <p>{outputMessage}</p>
    </>
  );
}

export default App;
