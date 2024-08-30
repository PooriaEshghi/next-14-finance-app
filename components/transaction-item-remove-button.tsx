import { deleteTransaction } from "@/lib/actions";
import Button from "./button";

interface TransactionItBuProp{
    id:number
}

export default function TransactionItemRemoveButton({ id }: TransactionItBuProp) {
  return <Button  onClick={async () => {
    await deleteTransaction(id)
  }}>X</Button>
}