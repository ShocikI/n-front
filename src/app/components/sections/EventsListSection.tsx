'use client'
import dayjs from 'dayjs';

import { Event } from "@/app/_data/interfaces"
import { Label } from "@/components/ui/label"
import { EventComponent } from '../EventComponent';

dayjs.locale('pl');

type Props = {
    sectionName: string,
    events?: Event[],
    flag: boolean,
    setFlag: (flag: boolean) => void,
    isOwner: boolean,
    editable?: boolean
}

export const EventsListSection = (
    { sectionName, events, flag, setFlag, isOwner, editable }: Props
) => {
    if (!events?.length) 
        return null;

    return (
        <section className="flex flex-col w-full">
            <Label className="text-xl">{sectionName}:</Label>
            <div className="flex flex-row flex-wrap gap-2">
                {events?.map((event) => 
                    <EventComponent 
                        event={event} 
                        key={event.id} 
                        isOwner={isOwner}
                        editable={editable}
                    />
                )}
            </div>
        </section>
    )
}