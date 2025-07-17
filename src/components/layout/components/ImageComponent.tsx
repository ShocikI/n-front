import { Event } from "@/utils/interfaces";

type Props = { event: Event };

export const ImageComponent = ({ event }: Props) => {
    
    const getImage = () => {
        if (event.image != null) {
            if (event.image.startsWith("/public"))
                return `${process.env.NEXT_PUBLIC_API_URL}/${event.image}`
            return event.image
        }
        
        switch (event.category.title) {
            case "Party": 
                return "/defaults-images/party.svg"
            case "Sale":
                return "/defaults-images/sale.svg"
            case "Stand-up":
                return "/defaults-images/standup.svg"
            case "Theatre":
                return "/defaults-images/theatre.svg"
            case "Special event":
                return "/defaults-images/specialevent.svg"
            default:
                return undefined
        }
    }

    return <img src={getImage()} className="w-fill max-h-[160px] object-cover"/>
}