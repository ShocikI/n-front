import { GoogleMaps } from "../GoogleMaps";
import { Header } from "../Header";

export const LoggedStartLayout = ( ) => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex h-full items-center justify-evenly">
                <GoogleMaps/>
            </div>
        </div>
    )
}