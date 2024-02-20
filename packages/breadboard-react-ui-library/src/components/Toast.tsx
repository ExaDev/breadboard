import { Elements } from "../../../breadboard-ui/src/index";
import { createComponent } from "@lit/react";
import React from "react";
import { ToastType } from "../../../breadboard-ui/src/events/events";

type ToastProps = {
  onClick: () => void;
  onError: () => void;
  toastMessage: string;
};

const Toast = ({
  onClick,
  onError,
  toastMessage,
}: ToastProps): React.JSX.Element => {
  const LitReactToast = createComponent({
    tagName: "bb-toast",
    elementClass: Elements.Toast,
    react: React,
    events: {
      connectedCallback: "onClick",
    },
  });

  return (
    <LitReactToast
      onClick={onClick}
      handleError={onError}
      type={ToastType.INFORMATION}
      message={toastMessage}
    />
  );
};

export default Toast;
