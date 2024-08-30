import { createClient } from "@/lib/Supabase/server";

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
  return <>Hello!</>;
}
