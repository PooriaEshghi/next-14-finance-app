"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Transaction {
  id: number;
  amount: number;
  type: "Income" | "Expense" | "Investment" | "Saving";
  description: string;
  category: string;
  created_at: string;
}

// Zod schema
const transactionSchema = z.object({
  id: z.number().optional(),
  type: z.enum(types),
  category: z.enum(categories),
  amount: z.coerce.number().min(1, {
    message: "Amount must be at least 1",
  }),
  description: z.string().min(1, {
    message: "The description is required",
  }),
  created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Date needs to contain a valid date",
  }),
});

type Inputs = z.infer<typeof transactionSchema>;

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onTouched",
    // resolver: zodResolver(transactionSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log(process.env.NEXT_PUBLIC_API_URL);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type" className="mb-1">
            Type
          </Label>
          <Select id="type" {...register("type")}>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          {errors.type && (
            <p className="mt-1 text-red-500">{errors.type.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="category" className="mb-1">
            Category
          </Label>
          <Select id="category" {...register("category")}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          {errors.category && (
            <p className="mt-1 text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="created_at" className="mb-1">
            Date
          </Label>
          <Input type="date" id="created_at" {...register("created_at")} />
          {errors.created_at && (
            <p className="mt-1 text-red-500">{errors.created_at.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="amount" className="mb-1">
            Amount
          </Label>
          <Input
            type="number"
            id="amount"
            {...register("amount", {
              valueAsNumber: true, // This ensures that the value is treated as a number
            })}
          />
          {errors.amount && (
            <p className="mt-1 text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="description" className="mb-1">
            Description
          </Label>
          <Input id="description" {...register("description")} />
          {errors.description && (
            <p className="mt-1 text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
