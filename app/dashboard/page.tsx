import { Suspense } from "react"
import TransactionList from "./camponents/transaction-list"
import TransactionListFallback from "./camponents/transaction-list-fallback"
import Trend from "./camponents/trend"
import TrendFallback from "./camponents/trend-fallback"

function page() {
  return (
    <>
     <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
      <Suspense fallback={<TrendFallback/>}>
        <Trend type="Income" />
      </Suspense>
      <Suspense fallback={<TrendFallback/>}>
        <Trend type="Expense" />
      </Suspense>
      <Suspense fallback={<TrendFallback/>}>
        <Trend type="Saving" />
      </Suspense>
      <Suspense fallback={<TrendFallback/>}>
        <Trend type="Investment" />
      </Suspense>
    </section>
    <Suspense fallback={<TransactionListFallback/>}>

    <TransactionList/>
    </Suspense>
    </>
  )
}

export default page