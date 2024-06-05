// Alert.js
import { useEffect, useState } from "react";

export default function Alert({ alertIcon, alertMessage, action }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (action === "successfullyDeleted") {
      setIsVisible(true);
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [action]);

  return (
    <>
      {isVisible && (
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
