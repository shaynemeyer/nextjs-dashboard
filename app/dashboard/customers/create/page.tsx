import React from 'react';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import Form from '@/app/ui/customers/create-form';
import { publicImageFiles } from '@/app/lib/files';

export const metadata: Metadata = {
  title: 'Create Customer',
};

function CreateCustomerPage() {
  const profileImages = publicImageFiles('customers');

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customer',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <Form profileImages={profileImages} />
    </main>
  );
}

export default CreateCustomerPage;
