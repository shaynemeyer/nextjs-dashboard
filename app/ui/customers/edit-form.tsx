'use client';

import Link from 'next/link';
import { CustomerForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  AtSymbolIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions/customers';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Form({
  profileImages = [],
  customer,
}: {
  profileImages: string[];
  customer: CustomerForm;
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCustomer, initialState);
  const [selectedImage, setSelectedImage] = useState('');

  const pathname = usePathname();

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="Name" className="mb-2 block text-sm font-medium">
            Enter customer name
          </label>
          <div className="relative">
            <input
              required
              id="Name"
              name="Name"
              defaultValue={customer.name}
              placeholder="Enter customer name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.Name &&
              state.errors.Name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Email Address */}
        <div className="mb-4">
          <label htmlFor="Email" className="mb-2 block text-sm font-medium">
            Enter an email address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                required
                id="Email"
                name="Email"
                type="email"
                defaultValue={customer.email}
                placeholder="Enter an email address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.Email &&
              state.errors.Email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Image */}
        <div className="mb-4 w-full">
          <div className="flex w-full flex-row gap-2">
            <div>
              <label
                htmlFor="Image_url"
                className="mb-2 block text-sm font-medium"
              >
                Choose Image
              </label>
              <div className="relative">
                <select
                  id="Image_url"
                  name="Image_url"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue={customer.image_url}
                  aria-describedby="customer-error"
                  onChange={(event) => {
                    setSelectedImage(event.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select an image
                  </option>

                  {profileImages.map((pic) => (
                    <option key={pic} value={pic}>
                      {pic}
                    </option>
                  ))}
                </select>
                {customer.image_url ? (
                  <Image
                    src={customer.image_url}
                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full"
                    width={28}
                    height={28}
                    alt={`profile picture`}
                  />
                ) : (
                  <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                )}
              </div>
            </div>
            <div className="self-end">
              <Link
                href={`/dashboard/customers/upload?returnUrl=${pathname}`}
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
              >
                Upload Profile Pic
              </Link>
            </div>
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.Image_url &&
              state.errors.Image_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Customer</Button>
      </div>
    </form>
  );
}
