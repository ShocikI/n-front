import { GoogleMaps } from "./GoogleMaps"
import StartSearchbar from "./StartSearchbar"

export const SearchWithMap = () => {
    return (
        <div className="flex flex-col basis-2/4">
            <StartSearchbar />
            <GoogleMaps />
        </div>
    )
}