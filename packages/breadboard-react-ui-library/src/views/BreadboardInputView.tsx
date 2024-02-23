import InputForm from "../components/InputForm";
import { Schema } from "@google-labs/breadboard";

const BreadboardInputView = (): React.JSX.Element => {
  const configuration = {
    schema: {
      properties: {
        secret: {
          title: "name",
          description: `Enter name`,
          type: "string",
        },
      },
    } as Schema,
  };
  return (
    <div className="card">
      <InputForm configuration={configuration} />
    </div>
  );
};

export default BreadboardInputView;
