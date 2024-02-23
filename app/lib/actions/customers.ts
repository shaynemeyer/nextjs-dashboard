'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function deleteCustomer(id: string) {
  try {
    // delete the inventory
    await sql`DELETE FROM invoices WHERE 	
    Customer_id = ${id};`;
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Customer.' };
  }
}
