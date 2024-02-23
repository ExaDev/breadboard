import { useState } from "react";
import Toast from "../components/Toast";
import { ToastType } from "../../../breadboard-ui/dist/src/events/events";

const BreadboardToastsView = (): React.JSX.Element => {
  const [infoToast, setInfoToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [warningToast, setWarningToast] = useState(false);

  return (
    <>
      <div className="card">
        <button id="toast-info" onClick={() => setInfoToast(true)}>
          Show Info Toast
        </button>
        {infoToast && (
          <>
            <Toast toastMessage="Information" type={ToastType.INFORMATION} />
          </>
        )}
        <button id="toast-error" onClick={() => setErrorToast(true)}>
          Show Error Toast
        </button>
        {errorToast && (
          <>
            <Toast toastMessage="Error" type={ToastType.INFORMATION} />
          </>
        )}
        <button id="toast-warning" onClick={() => setWarningToast(true)}>
          Show Warning Toast
        </button>
        {warningToast && (
          <>
            <Toast toastMessage="Warning" type={ToastType.INFORMATION} />
          </>
        )}
      </div>
    </>
  );
};

export default BreadboardToastsView;
