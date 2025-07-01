
import { Layout } from "@/app/_components/Layout";
import { EventPage } from "./_components/EventPage";

export default async function Home() {
  return (
    <Layout>
      <EventPage/>
    </Layout>
  );
}
