import React from 'react';
import { client } from '@/app/_data/client';
import { EventForm } from '@/app/components/forms/EventForm';
import { Layout } from '@/app/components/Layout';

export default async function Page() {
  return (
    <Layout>
      <EventForm />
    </Layout>
  );
}
