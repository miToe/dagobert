import Button from "@/src/components/Button";
import { ButtonGroup, ModalBox, ModalHint, ModalMessage, ModalWrapper } from "@/src/components/styles/StyledModal";

export default function Modal({ message, onConfirm, onCancel, id, hint }) {
  return (
    <ModalWrapper>
      <ModalBox>
        <ModalMessage>{message}</ModalMessage>
        <ModalHint>{hint}</ModalHint>
        <ButtonGroup>
          <Button onClick={() => onCancel("default")}>Cancel</Button>
          <Button onClick={() => onConfirm(id)}>Confirm</Button>
        </ButtonGroup>
      </ModalBox>
    </ModalWrapper>
  );
}
