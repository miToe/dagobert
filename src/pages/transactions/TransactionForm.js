import { useRouter } from "next/router";
// {new Date().toISOString().substring(0, 10)}
export default function TransactionForm({
                                          transaction,
                                          mode,
                                          initialData = {
                                            transactionType: "",
                                            amount: "",
                                            currency: "",
                                            date: "",
                                            category: "",
                                            paymentMethod: "",
                                            description: "",
                                          },
                                          onAddTransaction,
                                        }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddTransaction(data);
    console.log(data);
    router.push("/");
  }

  return (
    <>
      {mode === "add" && (
        <form onSubmit={handleSubmit}>
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
            placeholder="Set an amount (e.g.: 50,00)"
            defaultValue={initialData.amount}
            required
          />
          <br />
          <label htmlFor="currency">Currency</label>
          <br />
          <select id="currency" name="currency" defaultValue={initialData.currency} required>
            <option value="">Select currency</option>
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
          <textarea id="description" name="description" rows="5" cols="50" placeholder="Add a desrciption (optional)"
                    defaultValue={initialData.description} />
          <button type="submit">Submit</button>
        </form>
      )}
      {mode === "edit" && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="transactionType">Transaction Type</label>
          <br />
          <select id="transactionType" name="transactionType" defaultValue={transaction.transactionType} required>
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
            placeholder="Set an amount (e.g.: 50,00)"
            defaultValue={transaction.amount}
            required
          />
          <br />
          <label htmlFor="currency">Currency</label>
          <br />
          <select id="currency" name="currency" defaultValue={transaction.currency} required>
            <option value="">Select currency</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
          <br />
          <label htmlFor="date">Date</label>
          <br />
          <input type="date" id="date" name="date" defaultValue={transaction.date} required />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <select id="category" name="category" defaultValue={transaction.category} required>
            <option value="">Select category</option>
            <option value="Groceries">Groceries</option>
            <option value="Transport">Transport</option>
            <option value="Clothing">Clothing</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <br />
          <label htmlFor="paymentMethod">Payment Method</label>
          <br />
          <select id="paymentMethod" name="paymentMethod" defaultValue={transaction.paymentMethod} required>
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
          <textarea id="description" name="description" rows="5" cols="50" placeholder="Add a desrciption (optional)"
                    defaultValue={transaction.description} />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
