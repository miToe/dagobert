import { useEffect } from "react";

export default function Alert({ isOpen, message, duration, onAlertClose}) {
  useEffect(() => {
    let timeoutId;

    if (isOpen) {
      timeoutId = setTimeout(onAlertClose, duration);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration, isOpen, onAlertClose]);

  if (isOpen) {
    return (
      <>
        <p>
          {message}
        </p>
      </>
    );
  }
}