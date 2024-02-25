import Breadcrumbs from '@/app/ui/shared/breadcrumbs';
import React from 'react';
import { redirect } from 'next/navigation';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Button } from '@/app/ui/button';

function UploadProfilePicture({
  searchParams,
}: {
  searchParams?: {
    returnUrl?: string;
  };
}) {
  const upload = async (data: FormData) => {
    'use server';

    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      throw new Error('No file to upload');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join('public/', 'customers', file.name);

    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);

    redirect(
      searchParams?.returnUrl
        ? searchParams.returnUrl
        : '/dashboard/customers/',
    );
  };

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          { label: 'Create Customer', href: '/dashboard/customers/create' },
          {
            label: 'Upload Profile Picture',
            href: '/dashboard/customers/upload',
            active: true,
          },
        ]}
      />
      <form action={upload}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="file" className="mb-2 block text-sm font-medium">
              Profile Picture
            </label>
            <div className="relative">
              <input type="file" name="file" title="file" accept=".png" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </main>
  );
}

export default UploadProfilePicture;
