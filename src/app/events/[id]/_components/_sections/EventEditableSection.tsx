'use client'

import { Event } from "@/app/_data/interfaces"
import { EditEventForm } from "../_forms/EditEventForm"
import { CreateEventLinkForm } from "../_forms/CreateEventLinkForm"
import { UpdateEventImageForm } from "../_forms/UpdateEventImageForm"

type Props = {
    event: Event,
    flag: boolean,
    setFlag: (flag: boolean) => void,
}

export const EventEditableSection = ({ event, flag, setFlag }: Props) => {

    return (
    <main className="flex flex-col gap-4">
        <EditEventForm event={event}/>
        <section className="flex flex-row gap-4">
            <CreateEventLinkForm 
                eventId={event.id}
                flag={flag}
                setFlag={setFlag}
                />
            <UpdateEventImageForm 
                event={event} 
                flag={flag} 
                setFlag={setFlag}
                />
        </section>
    </main>
    )
}