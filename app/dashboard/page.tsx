import { createClient } from "@/lib/Supabase/server"
import { sizes, variants } from "@/lib/variants"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import TransactionList from "./camponents/transaction-list"
import TransactionListFallback from "./camponents/transaction-list-fallback"
import Trend from "./camponents/trend"
import TrendFallback from "./camponents/trend-fallback"
import { ErrorBoundary } from "react-error-boundary";
import { types } from "@/lib/consts"

async function page() {
  const client = createClient()
  return (
    <>
     <section className="mb-8">
      <h1 className="text-4xl font-semibold">Summary</h1>
    </section>
     <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
     {types.map(type => <ErrorBoundary key={type} fallback={<div className="text-red-500">Cannot fetch {type} trend data</div>}>
        <Suspense fallback={<TrendFallback />}>
          <Trend type={type} />
        </Suspense>
      </ErrorBoundary>)}
    </section>
    <section className="flex justify-between items-center mb-8">
      <h2 className="text-2xl">Transactions</h2>
      <Link href="/dashboard/transaction/add" className={`flex items-center space-x-1 ${variants['outline']} ${sizes['sm']}`}>
        <PlusCircle className="w-4 h-4" />
        <div>Add</div>
      </Link>
    </section>
    <Suspense fallback={<TransactionListFallback/>}>

    <TransactionList/>
    </Suspense>
    </>
  )
}

export default page