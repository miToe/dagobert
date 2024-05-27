import React from 'react';

// Example list of transactions
// TODO: to be removed and saved into localStorage
const transactions = [
  {
    "Date": "2023-12-01",
    "Amount": 100.50,
    "Currency": "USD",
    "Category": "Groceries",
    "Description": "Weekly grocery shopping",
    "PaymentMethod": "Credit Card"
  },
  {
    "Date": "2023-11-25",
    "Amount": 200.00,
    "Currency": "USD",
    "Category": "Electronics",
    "Description": "New headphones",
    "PaymentMethod": "PayPal"
  },
  {
    "Date": "2023-11-30",
    "Amount": 50.75,
    "Currency": "USD",
    "Category": "Dining",
    "Description": "Dinner at restaurant",
    "PaymentMethod": "Cash"
  },
  {
    "Date": "2023-12-02",
    "Amount": 25.00,
    "Currency": "USD",
    "Category": "Transport",
    "Description": "Taxi fare",
    "PaymentMethod": "Credit Card"
  },
  {
    "Date": "2023-11-20",
    "Amount": 75.00,
    "Currency": "USD",
    "Category": "Clothing",
    "Description": "New shoes",
    "PaymentMethod": "ApplePay"
  },
  {
    "Date": "2023-12-03",
    "Amount": 10.00,
    "Currency": "USD",
    "Category": "Miscellaneous",
    "Description": "Stationery",
    "PaymentMethod": "Cash"
  },
  {
    "Date": "2023-11-28",
    "Amount": 150.00,
    "Currency": "USD",
    "Category": "Utilities",
    "Description": "Electricity bill",
    "PaymentMethod": "Credit Card"
  },
  {
    "Date": "2023-12-01",
    "Amount": 30.00,
    "Currency": "USD",
    "Category": "Entertainment",
    "Description": "Movie tickets",
    "PaymentMethod": "PayPal"
  },
  {
    "Date": "2023-11-22",
    "Amount": 60.00,
    "Currency": "USD",
    "Category": "Groceries",
    "Description": "Grocery shopping",
    "PaymentMethod": "ApplePay"
  },
  {
    "Date": "2023-11-27",
    "Amount": 120.00,
    "Currency": "USD",
    "Category": "Dining",
    "Description": "Brunch with friends",
    "PaymentMethod": "Credit Card"
  }
];

const TransactionList = () => {
  // Sort transactions by date in descending order
  const sortedTransactions = transactions.sort((a, b) => new Date(b.Date) - new Date(a.Date));

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {sortedTransactions.map((transaction, index) => (
          <li key={index}>
            <h3>{transaction.Category}</h3>
            <div>{new Date(transaction.Date).toLocaleDateString('de-DE')}</div>
            <div>{transaction.Amount.toFixed(2)} {transaction.Currency}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
