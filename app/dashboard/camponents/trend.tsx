import BaseTrend from "@/components/trend"

interface TrendProps {
    type: "Income" | "Expense" | "Investment" | "Saving";
  }

export default async function Trend({type}:TrendProps) {
  const response = await fetch(`http://localhost:3100/trends/${type}`)
  const {amount, prevAmount} = await response.json()
  console.log(amount, prevAmount);
  
  return <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />
}