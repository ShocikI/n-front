

import { Layout } from '@/components/layout/layouts/Layout';
import { EventPage } from "./_components/EventPage";

export default async function Home() {
  return (
    <Layout>
      <EventPage/>
    </Layout>
  );
}
