`use client`;

import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";

import { Event } from "@/app/_data/interfaces"

type Props = { 
    event?: Event,
    isOwner?: boolean
}

export const UnmutableEventSection = ({ event, isOwner }: Props) => {
    const strDateArray = event?.date.toString().split("T");
    const router = useRouter();

    const moveToUserProfile = async () => {
            router.push(`/users/${event?.owner.username}/`);
        }

    return (
        <main className="flex flex-col">
            <section className="flex flex-row gap-4">
                { !!event?.image 
                    ?
                    <div className="items-start">
                        <img src={event?.image} className="max-h-[320px] min-h-[160px] rounded-xl"/>
                    </div>    
                    :
                    <div>
                        <FontAwesomeIcon icon={faImage} className="text-xl p-4 text-gray-600 h-[80px]" />
                    </div> 
                }
                <section className="flex flex-col w-fit gap-2">
                    <Label className="font-bold">{event?.title}</Label>
                    <button 
                        onClick={moveToUserProfile}
                        className="flex place-start underline hover:no-underline hover:text-white"
                        >Owner: {event?.owner.username}</button>
                    {!!strDateArray && <p>{strDateArray[0]} {strDateArray[1].slice(0,5)}</p>}
                    <p>{event?.address}</p>
                    {!isOwner && (
                        event?.avaliable_places != 0 
                        ? <p>Avaliable places: {event?.avaliable_places}</p>
                        : <p>Unlimited seating</p>
                    )}
                    {!isOwner && (
                        event?.price != 0 
                        ? <p>Price: {event?.price}</p>
                        : <p>Free entry</p>
                    )}
                </section>
            </section>
            <p className="pt-4">{!isOwner && event?.description}</p>
        </main>
    )
}