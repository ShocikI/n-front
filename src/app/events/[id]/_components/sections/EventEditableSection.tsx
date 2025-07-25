'use client'

import { Event } from "@/utils/interfaces"
import { EditEventForm } from "../forms/EditEventForm"
import { CreateEventLinkForm } from "../forms/CreateEventLinkForm"
import { UpdateEventImageForm } from "../forms/UpdateEventImageForm"

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