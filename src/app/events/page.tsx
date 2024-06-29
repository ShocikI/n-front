import React from 'react';
import EventPage from '../components/EventPage';
import { client } from '../data/client';
import AllFilters from '../components/AllFilters';

export default function Page() {
  const categories = client.getCategories();

  return (
    <div className="min-w-screen min-h-screen bg-accent">
      <div className="flex flex-col">
        <AllFilters categories={categories} />
        <div className="flex flex-col justify-center place-items-center p-4">
          <EventPage />
        </div>
      </div>
    </div>
  );
}
