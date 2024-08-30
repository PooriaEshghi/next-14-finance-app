import { fetchTransactions } from "@/lib/actions"
import TransactionList from "./transaction-list"

interface initialTransactionsProps {
    range: string;
  }

export default async function TransactionListWrapper({ range }:initialTransactionsProps) {
  const transactions = await fetchTransactions(range)
  return <TransactionList initialTransactions={transactions} key={range} range={range}/>
}