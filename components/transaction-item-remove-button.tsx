import { deleteTransaction } from "@/lib/actions";
import Button from "./button";
import { Loader, X } from "lucide-react";
import { useState } from "react";


interface TransactionItBuProp{
    id:number;
    onRemoved: Function
}

export default function TransactionItemRemoveButton({ id, onRemoved }: TransactionItBuProp) {
    const [loading, setLoading] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const handleClick = async () => {
      if (!confirmed) {
        setConfirmed(true)
        return
      }
      try {
        setLoading(true)
        await deleteTransaction(id)
        onRemoved()
      } finally {
        setLoading(false)
      }
    }
    return <Button size="xs" variant={!confirmed ? 'ghost' : 'danger'} onClick={handleClick} aria-disabled={loading}>
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
}