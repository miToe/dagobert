import Button from "@/src/components/styles/Button";
import React from "react";

export default function Modal({ message, onConfirm, onCancel, id, hint }) {
  return (
    <>
      <br />
      <hr />
      <h2>{message}</h2>
      <p>{hint}</p>
      <Button variant="secondary" onClick={() => onCancel("default")}>Cancel</Button>
      <Button variant="primary" onClick={() => onConfirm(id)}>Confirm</Button>
      <hr />
      <br />
    </>
  );
}
