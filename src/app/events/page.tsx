import React from 'react';
import { Layout } from '../components/Layout';
import { EventsPage } from '../components/pages/EventsPage';
import { client } from '../_data/client';

export default async function Page() {
  const categories = await client.getCategories();
  // Owrapować Allfilters i EventPage, żeby element wrapujący zrobić jako kliencki i -

  return (
    <Layout>
        <EventsPage />
    </Layout>
  );
}
