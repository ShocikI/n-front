'use client'
import dayjs from 'dayjs';

import { Event } from "@/app/data/interfaces"
import { Label } from "@/components/ui/label"
import { EventComponent } from '../EventComponent';

dayjs.locale('pl');

type Props = {
    sectionName: string,
    events?: Event[]
    flag: boolean,
    setFlag: (flag: boolean) => void,
    isOwner: boolean
}

export const EventsListSection = (
    { sectionName, events, flag, setFlag, isOwner }: Props
) => {
    if (!events?.length) 
        return null;

    return (
        <section className="flex flex-col">
            <Label className="text-xl">{sectionName}:</Label>
            <div className="flex flex-col gap-2">
                {events?.map((event) => 
                    <EventComponent 
                        event={event} 
                        key={event.id} 
                        isOwner={isOwner}
                    />
                )}
            </div>
        </section>
    )
}