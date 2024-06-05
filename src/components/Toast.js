import { useEffect } from "react";

export default function Toast({ isOpen, onToastClose, message, duration }) {
  useEffect(() => {
    let timeoutId;

    if (isOpen) {
      timeoutId = setTimeout(onToastClose, duration);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration, isOpen, onToastClose]);

  if (isOpen) {
    return (
      <>
        <p>
          {message} - shown for {duration}ms
        </p>
        <button onClick={onToastClose}>Close early</button>
      </>
    );
  }
}