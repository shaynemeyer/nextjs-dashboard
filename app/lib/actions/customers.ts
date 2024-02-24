'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    Name?: string[];
    Email?: string[];
    Image_url?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Email: z.string(),
  Image_url: z.string(),
});

const CreateCustomer = FormSchema.omit({ Id: true });

export async function createCustomer(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateCustomer.safeParse({
    Name: formData.get('Name'),
    Email: formData.get('Email'),
    Image_url: formData.get('Image_url'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }

  // Prepare data for insertion into the database
  const { Name, Email, Image_url } = validatedFields.data;

  try {
    await sql`
  INSERT INTO customers (Name, Email, Image_url)
  VALUES (${Name}, ${Email}, ${Image_url})
`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Customer',
    };
  }
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

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
