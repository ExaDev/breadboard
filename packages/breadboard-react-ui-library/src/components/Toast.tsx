import { Elements } from "../../../breadboard-ui/src/index";
import { createComponent } from "@lit/react";
import React from "react";
import { ToastType } from "../../../breadboard-ui/src/events/events";

type ToastProps = {
  toastMessage: string;
  type: ToastType;
};

const Toast = ({
  toastMessage,
  type = ToastType.INFORMATION,
}: ToastProps): React.JSX.Element => {
  const LitReactToast = createComponent({
    tagName: "bb-toast",
    elementClass: Elements.Toast,
    react: React,
    events: {
      onclick: "connectedCallback",
      onerror: "error",
    },
  });

  const handleError = (e: Event) => {
    console.log(e);
  };

  return (
    <LitReactToast onerror={handleError} type={type} message={toastMessage} />
  );
};

export default Toast;
