import React from 'react';
import { Layout } from '../_components/Layout';
import { client } from '../../_utils/client';
import { EventsPage } from '../_components/EventsPage';

export default async function Page() {
  const categories = await client.getCategories();
  // Owrapować Allfilters i EventPage, żeby element wrapujący zrobić jako kliencki i -

  return (
    <Layout>
        <EventsPage />
    </Layout>
  );
}
