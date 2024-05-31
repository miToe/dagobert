import { useEffect, useState } from "react";

export default function Alert({ alertIcon, alertMessage }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (isVisible) {
      timeoutId = setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  return (
    <>
      {alert && (
        <div>
          <br />
          <hr />
          <div>{alertIcon}</div>
          <p>{alertMessage}</p>
          <hr />
          <br />
        </div>
      )}
    </>
  );
}
