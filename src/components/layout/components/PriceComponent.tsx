import { Label } from "@/components/ui/label";
import { Event } from "@/utils/interfaces";

type Props = { event?: Event };

export const PriceComponent = ({ event }: Props) => {

    const getPrice = () => {
        if (event?.price != 0)
            return `Price: ${event?.price}`
        else
            return `Free entry` 
    }

    return <Label>{getPrice()}</Label>
}