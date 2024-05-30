export default function Modal({ message, onConfirm, onCancel, hint }) {
  return (
    <>
      <h2>{message}</h2>
      <p>{hint}</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </>
  );
}
