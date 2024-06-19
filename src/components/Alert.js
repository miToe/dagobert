import { useEffect } from "react";
import { AlertBox, AlertIconWrapper, AlertMessage, AlertWrapper } from "@/src/components/styles/StyledAlert";
import SVGIcon from "@/src/components/SVGIcon";

export default function Alert({ isOpen, message, duration, onAlertClose }) {
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
      <AlertWrapper>
        <AlertBox>
          <AlertIconWrapper>
            <SVGIcon iconName="check" />
          </AlertIconWrapper>
          <AlertMessage>{message}</AlertMessage>
        </AlertBox>
      </AlertWrapper>
    );
  }
}