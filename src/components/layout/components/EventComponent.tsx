'use client';

import { FC } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

import { Event } from '@/utils/interfaces';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ImageComponent } from './ImageComponent';
import { PriceComponent } from './PriceComponent';
import { AvaliablePlaceComponent } from './AvaliablePlacesComponent';

dayjs.locale('pl');

type Props = { 
  event: Event,
  isOwner: boolean,
  editable?: boolean
};

export const EventComponent: FC<Props> = ({ event, isOwner, editable }) => {
  const router = useRouter();

  const moveToEventPage = () => router.push(`/events/${event.id}/`)

  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <div className="flex flex-col box-border gap-1 mt-2 p-4 w-1/5 max-w-1/4 min-w-[200px] border-2 border-primary">
      <ImageComponent event={event}/>
      <button className="font-bold place-start" onClick={moveToEventPage}>
          {event.title}
      </button>
        <Label>{dayjs(event.date).format('LLL')}</Label>
        <Label>Kategoria: {event.category.title}</Label>
        <PriceComponent event={event} />
        <AvaliablePlaceComponent event={event} />
      <div className='flex flex-col items-end justify-between'>
        { ( isOwner && editable ) &&
          <Button onClick={() => router.push(`/events/${event.id}/`)}
            className='mt-1'
          >
            Edit event
          </Button>
        }
      </div>
    </div>
  );
};