import React from 'react';
import { Layout } from '../components/Layout';
import EventPage from '../components/EventPage';
import { client } from '../data/client';

export default async function Page() {
  const categories = await client.getCategories();
  // Owrapować Allfilters i EventPage, żeby element wrapujący zrobić jako kliencki i -

  return (
    <Layout>
        <div className="flex flex-col p-4">
          <EventPage />
        </div>
    </Layout>
  );
}
