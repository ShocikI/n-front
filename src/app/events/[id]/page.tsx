

import { Layout } from '@/components/layout/Layout';
import { EventPage } from "./_components/EventPage";

export default async function Home() {
  return (
    <Layout>
      <EventPage/>
    </Layout>
  );
}
