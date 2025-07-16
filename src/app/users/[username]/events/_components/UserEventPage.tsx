'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { client } from "@/_utils/client";
import { Event } from "@/_utils/interfaces";
import { EventsListSection } from "./EventsListSection";


export const UserEventPage = () => {
    const router = useRouter();
    const { username } = useParams();
    const [ pastEvents, setPastEvents ] = useState<Event[]>();
    const [ upcomingEvents, setUpcomingtEvents ] = useState<Event[]>();
    const [ ownerLogged, setOwnerLogged ] = useState(false)
    const [ reloadFlag, setReloadFlag ] = useState(false);

    useEffect(() => {
        const getUserEvents = async () => {
            const responseToken = await client.checkToken();
            if (responseToken === username)
                setOwnerLogged(true);

            const response = await client.getUserEvents(username?.toString());
            if (response.status === 404) 
                router.push(`/`);

            setPastEvents(response.pastEvents);
            setUpcomingtEvents(response.upcomingEvents);
        }
        getUserEvents();

    }, [ reloadFlag ])

    return (
        <main className="flex flex-col w-4/5 min-w-[510px] gap-4">
            <EventsListSection 
                sectionName={`Upcoming ${username}'s events`}
                events={upcomingEvents} 
                flag={reloadFlag}
                setFlag={setReloadFlag}    
                isOwner={ownerLogged}
                editable={true}
            />
            <EventsListSection 
                sectionName={`Past ${username}'s events`}
                events={pastEvents} 
                flag={reloadFlag}
                setFlag={setReloadFlag}    
                isOwner={ownerLogged}
            />
        </main>
    )
}