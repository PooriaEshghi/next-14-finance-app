"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  type: string;
  category: string;
  created_at: string;
  amount: number;
  description: string;
};

const onSubmit: SubmitHandler<Inputs> = (data) => {
  const formattedData = {
    ...data,
    created_at: new Date(data.created_at),
  };
  console.log(formattedData);
};

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type" className="mb-1">
            Type
          </Label>
          <Select id="type" {...register("type", { required: "Type is required" })}>
            {types.map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>

        <div>
          <Label htmlFor="category" className="mb-1">
            Category
          </Label>
          <Select id="category" {...register("category", { required: "Category is required" })}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <Label htmlFor="created_at" className="mb-1">
            Date
          </Label>
          <Input
            id="created_at"
            type="date"
            {...register("created_at", { required: "Date is required" })}
          />
          {errors.created_at && <p className="text-red-500 text-sm">{errors.created_at.message}</p>}
        </div>

        <div>
          <Label htmlFor="amount" className="mb-1">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            {...register("amount", { required: "Amount is required", valueAsNumber: true })}
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
        </div>

        <div className="col-span-2">
          <Label htmlFor="description" className="mb-1">
            Description
          </Label>
          <Input
            id="description"
            {...register("description", {
              required: "Description is required",
              maxLength: { value: 200, message: "Description cannot exceed 200 characters" },
            })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
