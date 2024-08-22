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
      if (prevAmount === 0) return 0;
      return ((amount - prevAmount) / prevAmount) * 100;
    };
  
    const formatCurrency = (amount: number): string => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
    };
  
    return (
      <>
        <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
        <div className="font-semibold text-black dark:text-white mb-2">
          {amount ? formatCurrency(amount) : formatCurrency(0)}
        </div>
      </>
    );
  }
  
  export default Trend;
  