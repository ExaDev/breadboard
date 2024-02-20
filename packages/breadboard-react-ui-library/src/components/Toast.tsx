import { Elements } from "../../../breadboard-ui/src/index";
import { createComponent } from "@lit/react";
import React from "react";
import { ToastType } from "../../../breadboard-ui/src/events/events";

type ToastProps = {
  toastMessage: string;
};

const Toast = ({ toastMessage }: ToastProps): React.JSX.Element => {
  const LitReactToast = createComponent({
    tagName: "bb-toast",
    elementClass: Elements.Toast,
    react: React,
    events: {
      onclick: "connectedCallback", //left hand side: the name of the react event; right hand side: the name of the custom component's event
      onerror: "error",
    },
  });

  const handleError = (e: Event) => {
    console.log(e);
    console.log("root app error");
  };

  return (
    <LitReactToast
      onerror={handleError}
      type={ToastType.WARNING}
      message={toastMessage}
    />
  );
};

export default Toast;
