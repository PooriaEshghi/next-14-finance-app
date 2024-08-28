export interface Transaction {
    id: number;
    amount: number;
    type: "Income" | "Expense" | "Investment" | "Saving";
    description: string;
    category: string;
    created_at: string;
  }