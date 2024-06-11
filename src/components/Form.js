import { useRouter } from "next/router";

export default function Form({
                               onSubmitForm,
                               initialData = {
                                 transactionType: "",
                                 amount: "",
                                 currency: "EUR",
                                 date: new Date().toISOString().substring(0, 10),
                                 category: "",
                                 paymentMethod: "",
                                 description: "",
                               },
                               formTitle,
                               confirmButtonText,
                               addMode,
                               editMode,
                             }) {
  const router = useRouter();
  const { id } = router.query;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    data.amount = parseFloat(data.amount).toFixed(2);
    onSubmitForm(data);
  }

  function handleAmountInput(event) {
    const value = event.target.value;
    const regex = /^(?!-)\d+(\.\d{0,2})?$/;  // Disallow certain characters & negative values
    if (!regex.test(value)) {
      event.target.value = value.slice(0, -1);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {addMode && (<button type="button" onClick={() => {
          router.push("/");
        }}>Cancel</button>)}
        {editMode && (<button type="button" onClick={() => {
          router.push(`/transactions/${id}`);
        }}>Cancel</button>)}
        <h2>{formTitle}</h2>
        <button type="submit">{confirmButtonText}</button>
      </div>
      <label htmlFor="transactionType">Transaction Type</label>
      <br />
      <select id="transactionType" name="transactionType" defaultValue={initialData.transactionType} required>
        <option value="">Select a transaction type</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <br />
      <label htmlFor="amount">Amount</label>
      <br />
      <input
        type="number"
        id="amount"
        name="amount"
        placeholder="Set an amount (e.g.: 50.00)"
        defaultValue={Math.abs(initialData.amount)}
        step="0.01"
        min="0"  // Ensure the value cannot be below 0
        onInput={handleAmountInput}
        required
      />
      <br />
      <label htmlFor="currency">Currency</label>
      <br />
      <select id="currency" name="currency" defaultValue={initialData.currency} required>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>
      <br />
      <label htmlFor="date">Date</label>
      <br />
      <input type="date" id="date" name="date" defaultValue={initialData.date} required />
      <br />
      <label htmlFor="category">Category</label>
      <br />
      <select id="category" name="category" defaultValue={initialData.category} required>
        <option value="">Select category</option>
        <option value="Groceries">Groceries</option>
        <option value="Transport">Transport</option>
        <option value="Clothing">Clothing</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Healthcare">Healthcare</option>
      </select>
      <br />
      <label htmlFor="paymentMethod">Payment Method</label>
      <br />
      <select id="paymentMethod" name="paymentMethod" defaultValue={initialData.paymentMethod} required>
        <option value="">Select payment method</option>
        <option value="Cash">Cash</option>
        <option value="Debit card">Debit card</option>
        <option value="Credit card">Credit card</option>
        <option value="PayPal">PayPal</option>
        <option value="Apple Pay">Apple Pay</option>
      </select>
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <textarea id="description" name="description" rows="5" cols="50" placeholder="Add a description (optional)"
                defaultValue={initialData.description} />
    </form>
  );
}
