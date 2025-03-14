import { client } from "./data/client";
import { StartLayout } from "./components/layouts/StartLayout";
import { LoggedStartLayout } from "./components/layouts/LoggedStartLayout";
import { cookies } from "next/headers";


export default async function Home() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const isLogged = await client.checkToken(cookieHeader);
  console.log(`Logged: ${isLogged}`)
  
  return (
    <main className="w-screen h-screen bg-accent">
      { !!isLogged ? <LoggedStartLayout /> : <StartLayout /> }
    </main>
  );
}
