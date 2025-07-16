import React from 'react';
import { client } from '../../utils/client';
import { EventsPage } from '../_components/EventsPage';
import { Layout } from '@/components/layout/Layout';

export default async function Page() {
  const categories = await client.getCategories();
  // Owrapować Allfilters i EventPage, żeby element wrapujący zrobić jako kliencki i -

  return (
    <Layout>
        <EventsPage />
    </Layout>
  );
}
