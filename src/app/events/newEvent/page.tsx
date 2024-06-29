import React from 'react';
import { client } from '@/app/data/client';
import AllFilters from '@/app/components/AllFilters';
import { EventForm } from '@/app/components/EventForm';

export default function Page() {
  const categories = client.getCategories();

  return (
    <div className="min-w-screen min-h-screen bg-accent">
      <div className="flex flex-col place-items-center">
        <div className="min-w-screen">
          <AllFilters categories={categories} />
        </div>
        <div className="flex flex-col justify-center place-items-center w-1/2 p-4">
          <EventForm />
        </div>
      </div>
    </div>
  );
}
