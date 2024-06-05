import { useEffect } from "react";

export default function Alert({ isOpen, alertIcon, alertMessage, duration }) {

  useEffect(() => {
    let timeoutId;
    if (isOpen) {
      timeoutId = setTimeout(duration);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration, isOpen]);

if(isOpen) {

  return (
    <>
        <div>
          <br />
          <hr />
          <div>{alertIcon}</div>
          <p>{alertMessage}</p>
          <hr />
          <br />
        </div>
    </>
  );
}
}
