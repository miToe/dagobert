// utils.js

export const calculateBalancesAndData = (transactions) => {
  const totalIncome = transactions
    .filter((transaction) => transaction.transactionType === "Income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.transactionType === "Expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const maxTransactionAmount = Math.max(
    ...transactions.map((transaction) => Math.abs(transaction.amount))
  );

  const pieData = transactions.reduce((acc, transaction) => {
    const category = acc.find((item) => item.name === transaction.category);
    if (category) {
      category.value += transaction.amount;
    } else {
      acc.push({ name: transaction.category, value: transaction.amount });
    }
    return acc;
  }, []);

  const now = new Date();
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(now.getDate() - 28);

  const chartData = [];
  for (let i = 0; i < 4; i++) {
    const startOfWeek = new Date(fourWeeksAgo);
    startOfWeek.setDate(fourWeeksAgo.getDate() + i * 7);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const weeklyIncome = transactions
      .filter(
        (transaction) =>
          new Date(transaction.date) >= startOfWeek &&
          new Date(transaction.date) <= endOfWeek &&
          transaction.transactionType === "Income"
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const weeklyExpense = transactions
      .filter(
        (transaction) =>
          new Date(transaction.date) >= startOfWeek &&
          new Date(transaction.date) <= endOfWeek &&
          transaction.transactionType === "Expense"
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    chartData.push({
      week: `W${i + 1}`,
      income: weeklyIncome,
      expense: weeklyExpense,
    });
  }

  return {
    totalIncome,
    totalExpenses,
    maxTransactionAmount,
    pieData,
    chartData,
  };
};
