'use client';

import { client } from "@/app/data/client";
import { Event } from "@/app/data/interfaces";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EditEventForm } from "../forms/EditEventForm";
import { UnmutableEventSection } from "../sections/UnmutableEventSection";
import { EventEditableSection } from "../sections/EventEditableSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { EventLinksSection } from "../sections/EventLinksSection";

export const EventPage = () => {
    const router = useRouter();
    const [ event, setEvent ] = useState<Event>();
    const [ ownerLogged, setOwnerLogged ] = useState(false)
    const [ reloadFlag, setReloadFlag ] = useState(false);
    const pathname = usePathname()
    const eventId = Number(pathname?.split("/").reverse()[0])

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await client.getEventById(eventId);
                console.log(data)
                const username = data.data.owner.username

                const responseToken = await client.checkToken();
                if (responseToken === username)
                    setOwnerLogged(true);

                if (data.status != 200)
                    router.back()

                setEvent(data.data);
            } catch (error) {
                console.error("Event doesn't exists:", error);
                router.push("/");
            }
        };

        fetchEvent();
        
    }, [ reloadFlag ]);

    return (
        <main className="flex flex-col w-2/3 min-w-[350px] gap-4">
            <UnmutableEventSection event={event} isOwner={ownerLogged}/>

            {event && ownerLogged && 
            <EventEditableSection 
                event={event} 
                flag={reloadFlag} 
                setFlag={setReloadFlag}
            />
            }
            {event &&
            <EventLinksSection 
                id={event.id} 
                flag={reloadFlag} 
                setFlag={setReloadFlag}
                isOwner={ownerLogged}
                isEditPage={ownerLogged}
            />
            }
        </main>
    )


}