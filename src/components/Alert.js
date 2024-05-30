import { useEffect, useState } from "react";

export default function Alert({ alertIcon, alertMessage }) {
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (alert) {
      timeoutId = setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [alert]);

  return (
    <>
      {alert && (
        <div>
          <div>{alertIcon}</div>
          <p>{alertMessage}</p>
        </div>
      )}
    </>
  );
}
