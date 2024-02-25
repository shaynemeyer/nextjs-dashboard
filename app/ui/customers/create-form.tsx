'use client';

import Link from 'next/link';
import {
  CheckIcon,
  AtSymbolIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions/customers';
import { useFormState } from 'react-dom';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { useState } from 'react';

export default function Form({
  profileImages = [],
}: {
  profileImages: string[];
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
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Enter customer name
          </label>
          <div className="relative">
            <input
              required
              id="name"
              name="name"
              placeholder="Enter customer name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Enter an email address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                required
                id="email"
                name="email"
                type="email"
                placeholder="Enter an email address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
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
                htmlFor="image_url"
                className="mb-2 block text-sm font-medium"
              >
                Choose Image
              </label>
              <div className="relative">
                <select
                  id="image_url"
                  name="image_url"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
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
                {selectedImage ? (
                  <Image
                    src={selectedImage}
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
                href={`upload?returnUrl=${pathname}`}
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
              >
                Upload Profile Pic
              </Link>
            </div>
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image_url &&
              state.errors.image_url.map((error: string) => (
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
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
