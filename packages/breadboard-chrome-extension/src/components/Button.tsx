import { ReactElement } from "react";
import "./Button.css";

interface Params {
  className?: string;
  onClick?: () => void;
  title: string;
}

export const Button = ({ className, onClick, title }: Params): ReactElement => {
  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  );
};
