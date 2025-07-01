import { GoogleMaps } from "./_components/_mapComponents/GoogleMaps";
import { Layout } from "./_components/Layout";


export default function Home() {  
  return (
    <Layout>
      <div className="w-4/5 h-4/5">
        <GoogleMaps/>
      </div>
    </Layout>
  );
}
