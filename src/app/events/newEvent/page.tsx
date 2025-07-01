import React from 'react';

import { EventForm } from './_components/EventForm';
import { Layout } from '@/app/_components/Layout';

export default async function Page() {
  return (
    <Layout>
      <EventForm />
    </Layout>
  );
}
