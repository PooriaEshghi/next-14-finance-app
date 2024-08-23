import { useFormatCurrency } from "@/hooks/use-formatcurrency";
import { ArrowDownLeft } from "lucide-react";
import { ArrowUpRight } from 'lucide-react';
import { useMemo } from "react";

interface TrendProps {
    type: 'Income' | 'Expense' | 'Investment' | 'Saving';
    amount: number;
    prevAmount: number;
  }
  
  function Trend({ type, amount, prevAmount }: TrendProps) {
    const colorClasses: {
      Income: string;
      Expense: string;
      Investment: string;
      Saving: string;
    } = {
      Income: 'text-green-700 dark:text-green-300',
      Expense: 'text-red-700 dark:text-red-300',
      Investment: 'text-indigo-700 dark:text-indigo-300',
      Saving: 'text-yellow-700 dark:text-yellow-300'
    };
  
    const calcPercentageChange = (amount: number, prevAmount: number): number => {
      if (!prevAmount || !amount) return 0;
      return ((amount - prevAmount) / prevAmount) * 100;
    };

    const percentageChange = useMemo(
        () => +calcPercentageChange(amount, prevAmount).toFixed(0),
        [amount, prevAmount]
    )
  
    const formattedAmount = useFormatCurrency(amount)
  
    return (
      <>
        <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
        <div className="font-semibold text-black dark:text-white mb-2">
          {formattedAmount}
        </div>
          <div className="flex space-x-1 items-center text-sm">
            {percentageChange <= 0 && <ArrowDownLeft/>}
            {percentageChange > 0 && <ArrowUpRight/>}
      <div>
              
              {percentageChange}% vs last period
          </div>
      </div>
      </>
    );
  }
  
  export default Trend;
  