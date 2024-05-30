export default function Modal({ message, onConfirm, onCancel, hint }) {

  return (
    <>
      <h2>{message}</h2>
      <p>{hint}</p>
      <button onClick={onCancel}>cancel
      </button>
      <button onClick={onConfirm}>confirm</button>
    </>
  );
}
