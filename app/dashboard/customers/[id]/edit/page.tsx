import React from 'react';
import Breadcrumbs from '@/app/ui/shared/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchCustomerById } from '@/app/lib/data';
import Form from '@/app/ui/customers/edit-form';
import { publicImageFiles } from '@/app/lib/files';

export const metadata: Metadata = {
  title: 'Edit Customer',
};
async function EditCustomerPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const customer = await fetchCustomerById(id);
  if (!customer) {
    notFound();
  }

  const profileImages = publicImageFiles('customers');

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Edit Customer',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form profileImages={profileImages} customer={customer} />
    </main>
  );
}

export default EditCustomerPage;
