import { useEffect, useState } from "react";
import { ExtensionBoardRunner } from "@breadboard/classes/ExtensionBoardRunner";
import serializedAudioTranscriptBoard from "@breadboard/graphs/AudioTranscriptBoard.json";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const BbAudioRecorder = (): React.JSX.Element => {
  const [key, setKey] = useState<string>("");
  const [audioBlob, setAudioBlob] = useState<Blob>(new Blob());

  useEffect(() => {
    chrome.storage.sync.get(["HUGGING_FACE_API_KEY"], (result) => {
      setKey(result["HUGGING_FACE_API_KEY"]);
    });
  }, [key]);

  const handleTranscript = async () => {
    const extensionRunner = new ExtensionBoardRunner(
      serializedAudioTranscriptBoard,
      []
    );
    const boardRun = await extensionRunner.runBoard({
      data: audioBlob,
      apiKey: key,
    });
    console.log(audioBlob);
    if (boardRun) {
      console.log(boardRun);
    }
  };

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: Blob) => {
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <main>
      <section className="outputForm">
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          downloadOnSavePress
          downloadFileExtension="mp3"
        />
        <button onClick={recorderControls.stopRecording}>Stop recording</button>
        <button type="submit" onClick={handleTranscript}>
          Transcribe audio
        </button>
      </section>
      <section className="output">
        {/*
		If an audio transcript is available, display it here
		*/}
      </section>
    </main>
  );
};

export default BbAudioRecorder;
