import { useEffect, useState } from "react";

export default function Alert({ alertIcon, alertMessage }) {
  const [alertIsOpen, setAlertIsOpen] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (alertIsOpen) {
      timeoutId = setTimeout(() => {
        setAlertIsOpen(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [alertIsOpen]);

  return (
    <>
      {alertIsOpen && (
        <div>
          <div>{alertIcon}</div>
          <p>{alertMessage}</p>
        </div>
      )}
    </>
  );
}

