import { GoogleMaps } from "../GoogleMaps"
import { LoginRegister } from "../LoginRegister"

export const StartLayout = () => {

    return (
        <div className="flex h-screen items-center justify-evenly">
            <GoogleMaps /> 
            <div className="divider divider-horizontal divider-primary h-[80vh] mt-[10vh] basis-1/8"/>
            <LoginRegister />
        </div>
    );
}