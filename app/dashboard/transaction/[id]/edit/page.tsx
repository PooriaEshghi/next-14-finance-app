import TransactionForm from "@/app/dashboard/camponents/transaction-form";
import { createClient } from "@/lib/Supabase/server";
import { notFound } from 'next/navigation';

export const metadata = {
  title: "Edit Transaction"
}

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: PageProps): Promise<JSX.Element> {
  const supabase = createClient();
  const { data: transaction, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    // Handle the error appropriately, possibly return an error component or message
  }

  console.log(transaction);
  if (error) notFound()

    return <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
}
