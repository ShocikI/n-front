import { GoogleMaps } from "./components/GoogleMaps";
import { LoginRegister } from "./components/LoginRegister";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-accent">
      <div className="flex h-screen items-center justify-evenly">
        <GoogleMaps />
        <div className="divider divider-horizontal divider-primary h-[80vh] mt-[10vh] basis-1/8"/>
        <LoginRegister />
      </div>
    </main>
  );
}
