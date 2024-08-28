'use server'
import { revalidateTag } from 'next/cache'
import { createClient } from './Supabase/server'
import { revalidatePath } from 'next/cache'
import {Transaction} from '../types/types'
import { transactionSchema } from './validation'


export async function createTransaction(formData: Transaction) {
  const validated = transactionSchema.safeParse(formData)
  if(!validated.success){
    throw new Error('Invalid data')
  }
  const { error } = await createClient().from('transactions')
    .insert(validated.data)
    if (error) {
      throw new Error('Failed creating the transaction')
    }
  
    revalidatePath('/dashboard')
}