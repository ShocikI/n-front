
import { EventPage } from "@/app/components/pages/EventPage";
import { Layout } from "@/app/components/Layout";

export default async function Home() {
  return (
    <Layout>
      <EventPage/>
    </Layout>
  );
}
