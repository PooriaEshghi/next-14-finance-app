"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { transactionSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createTransaction, updateTransaction} from "@/lib/actions";
import FormError from "@/components/form-error";
import { FieldError } from "react-hook-form";
import { Transaction } from "@/types/types";

interface InitialTransactionFormProps {
  initialData: Transaction;
}

export default function TransactionForm({initialData}:InitialTransactionFormProps) {
  const [today, setToday] = useState('');

useEffect(() => {
  setToday(new Date().toDateString());
}, []);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Transaction>({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ?? {
      created_at: today
    }
    // defaultValues: {
    //   ...initialData,
    //   created_at: initialData?.created_at ?? new Date().toISOString().split('T')[0],
    // },
  });
  const router = useRouter()
  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState<string | FieldError | null>();
  const type = watch('type')
  // const editing = Boolean(initialData)
  const editing = !!initialData



  const onSubmit: SubmitHandler<Transaction> = async (data) => {
  
    const transaction: Transaction = {
      ...data,
      created_at:`${data.created_at}T00:00:00`
    };

    setSaving(true);
    setLastError(undefined)
    try {
     if (editing) {
      await updateTransaction(
        initialData.id,
        data
      )
     } else {
      
       await createTransaction(data)
     }
      router.push('/dashboard')
    }catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        setLastError((error as Error).message);
      } else {
        setLastError("An unexpected error occurred");
      }
    
    }
    
    finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Type</Label>
          <Select {...register("type",{
            onChange:(e) => {
              if(e.target.value === "Expense"){
                setValue('category','')
              }
            }
          })}>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          {errors.type && <p className="mt-1 text-red-500">{errors.type.message}</p>}
        </div>

        <div>
          <Label className="mb-1">Category</Label>
          <Select {...register("category")}>
            <option value=''>Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          {errors.category && <p className="mt-1 text-red-500">{errors.category.message}</p>}
        </div>

        <div>
          <Label className="mb-1">Date</Label>
          <Input {...register("created_at")} disabled={editing} />
          <FormError error={errors.created_at} />
        </div>

        <div>
          <Label className="mb-1">Amount</Label>
          <Input {...register("amount")} />
          <FormError error={errors.amount} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label className="mb-1">Description</Label>
          <Input {...register("description")} />
          <FormError error={errors.description} />
        </div>
      </div>

      <div className="flex justify-between items-center">
      <div>
  {lastError && <FormError error={lastError} />}
</div>


        <Button type="submit" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}


