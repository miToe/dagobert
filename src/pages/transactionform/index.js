import { useRouter } from "next/router";

export default function TransactionForm({ onAddTransaction, transactions }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddTransaction(data);
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="role">
        Amount:
        <br />
        <input
          type="number"
          id="role"
          name="amount"
          value={transactions.amount}
          required
        />
      </label>
      <button type="submit">ADD</button>
    </form>
  );
}

// export default function TransactionForm({ onAddTransaction }) {
//   const router = useRouter();

//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData);
//     const newTransaction = {
//       id: uid(),
//       ...data,
//       amount: parseFloat(data.amount),
//     };

//     onAddTransaction(newTransaction);
//     router.push("/");
//   }

// function handleChange(event) {
//   const { name, value } = event.target;
//   setFormData({
//     ...formData,
//     [name]: value,
//   });
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   const newTransaction = {
//     id: uid(),
//     ...formData,
//     amount: parseFloat(formData.amount), // Convert string to number
//   };

//   setTransactions((initialTransactions) => [
//     ...initialTransactions,
//     newTransaction,
//   ]);
//   console.log(newTransaction);
//   router.push("/"); // Redirect to TransactionList
// }

//   function handleAbort() {
//     router.push("/");
//   }

//   return (
//     <div>
//       <h1>Expense</h1>
//       <form onSubmit={handleSubmit}>
//         <button type="button" onClick={handleAbort}>
//           Cancel
//         </button>
//         <div>
//           <label>Transaction Type:</label>
//           <select
//             name="transactionType"
//             value={formData.transactionType}
//             onChange={handleChange}
//             required
//           >
//             <option value="Expenses">Expenses</option>
//             <option value="Income">Income</option>
//           </select>
//         </div>

//         <div>
//           <label>Amount:</label>
//           <input
//             name="amount"
//             type="number"
//             value={formData.amount}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Entertainment">Entertainment</option>
//             <option value="Food">Food</option>
//             <option value="Shopping">Shopping</option>
//             <option value="Transport">Transport</option>
//           </select>
//         </div>
//         <div>
//           <label>Date:</label>
//           <input
//             name="date"
//             type="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <input
//             name="description"
//             type="text"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Payment Method:</label>
//           <select
//             name="paymentMethod"
//             value={formData.paymentMethod}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Payment Method</option>
//             <option value="Credit Card">Credit Card</option>
//             <option value="Debit Card">Debit Card</option>
//             <option value="Cash">Cash</option>
//             <option value="PayPal">PayPal</option>
//           </select>
//         </div>
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// }
