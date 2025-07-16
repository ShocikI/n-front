import { Layout } from "@/components/layout/layouts/Layout";
import { GoogleMaps } from "../components/layout/mapComponents/GoogleMaps";


export default function Home() {  
  return (
    <Layout>
      <div className="w-4/5 h-4/5">
        <GoogleMaps/>
      </div>
    </Layout>
  );
}
