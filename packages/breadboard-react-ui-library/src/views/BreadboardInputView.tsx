import InputForm from "../components/InputForm";
import { Schema } from "@google-labs/breadboard";

const BreadboardInputView = (): React.JSX.Element => {
  const schema = {
    properties: {
      secret: {
        title: "name",
        description: `Enter name`,
        type: "string",
      },
    },
  } as Schema;
  return (
    <div className="card">
      <InputForm schema={schema} />
    </div>
  );
};

export default BreadboardInputView;
