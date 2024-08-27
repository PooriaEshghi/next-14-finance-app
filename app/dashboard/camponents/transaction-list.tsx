import Separator from "@/components/separator";
import TransactionSummaryItem from "@/components/transaction-summary-item";

interface Transaction {
  id: number;
  amount: number;
  type: "Income" | "Expense" | "Investment" | "Saving";
  description: string;
  category: string;
  created_at: string;
}

interface GroupedTransactions {
  [date: string]: {
    transactions: Transaction[];
    amount: number;
  };
}

const groupAndSumTransactionsByDate = (
  transactions: Transaction[]
): GroupedTransactions => {
  const grouped: GroupedTransactions = {};

  transactions.forEach((transaction: Transaction) => {
    const date = transaction.created_at.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    grouped[date].transactions.push(transaction);

    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;
    grouped[date].amount += amount;
  });
  return grouped;
};

export default async function TransactionList() {
  try {
    const response = await fetch( `${process.env.API_URL}/transactions`, {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const transactions: Transaction[] = await response.json();
    const groupedTransactions = groupAndSumTransactionsByDate(transactions);

    return (
      <section className="space-y-4">
        {Object.entries(groupedTransactions).map(([date, group]) => (
          <div key={date}>
            <h2 className="font-bold text-lg">{date}</h2>
            <p className="text-gray-500">Total: {group.amount}</p>
            <div className="space-y-2">
              {group.transactions.map((transaction: Transaction) => (
                <>
                <Separator/>
                <TransactionSummaryItem
                  key={transaction.id}
                  date={date}
                  amount={transaction.amount}
                  />
                </>
                //     <TransactionItem
                //     key={transaction.id}
                //     type={transaction.type}
                //     category={transaction.category}
                //     description={transaction.description}
                //     amount={transaction.amount}
                //   />
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return <p>Failed to load transactions. Please try again later.</p>;
  }
}
