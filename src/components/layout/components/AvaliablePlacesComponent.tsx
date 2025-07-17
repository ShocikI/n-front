import { Label } from "@/components/ui/label";
import { Event } from "@/utils/interfaces";

type Props = { event?: Event };

export const AvaliablePlaceComponent = ({ event }: Props) => {
    
    const getAvaliablePlaces = () => {
        if (event?.avaliable_places != 0)
            return `Avaliable places: ${event?.avaliable_places}`
        else
            return `Unlimited seating` 
    }

    return <Label>{getAvaliablePlaces()}</Label>
}