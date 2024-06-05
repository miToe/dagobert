export default function Modal({ message, onConfirm, onCancel, id, hint }) {
  return (
    <>
      <br />
      <hr />
      <h2>{message}</h2>
      <p>{hint}</p>
      <button onClick={() => onCancel("default")}>Cancel</button>
      <button onClick={() => onConfirm(id)}>Confirm</button>
      <hr />
      <br />
    </>
  );
}
