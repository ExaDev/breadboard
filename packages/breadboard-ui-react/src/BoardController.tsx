import "./App.css";
import InputContainerWrapper from "./components/InputContainer";
import InputWrapper from "./components/Input";
import { BreadboardTypes } from "./breadboard-web-exports";
import { inputSchema } from "./breadboard";

type BoardControllerProps = {
  onSubmit: ((e: Event) => void) | undefined;
};

const BoardController = ({
  onSubmit,
}: BoardControllerProps): React.JSX.Element => {
  const inputConfig: BreadboardTypes.InputArgs = { schema: inputSchema };

  return (
    <InputContainerWrapper>
      <InputWrapper onSubmit={onSubmit} configuration={inputConfig} />
    </InputContainerWrapper>
  );
};

export default BoardController;
