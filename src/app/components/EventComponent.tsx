'use client';

import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

import { Event, Links } from '../_data/interfaces';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { EventLinksSection } from './sections/EventLinksSection';

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
  console.log(event)

  return (
    <div className="flex flex-col box-border mt-2 p-4 w-1/5 max-w-1/4 min-w-[200px] border-2 border-primary">
      { !!event.image &&
        <img 
          src={`${event.image}`} 
          className='min-w-[160px] h-fit'
        />          
      }
      <button className="font-bold place-start" onClick={moveToEventPage}>
          {event.title}
      </button>
        <Label>{dayjs(event.date).format('LLL')}</Label>
        <Label>Kategoria: {event.category.title}</Label>
        { !!event.price &&
          <Label>Cena: {event.price} zł</Label>
        }
        { !!event.avaliable_places &&
          <Label>Dostępne miejsca: {event.avaliable_places}</Label>
        }
      <div className='flex flex-col items-end justify-between'>
        { ( isOwner || editable ) &&
          <Button onClick={() => router.push(`/events/${event.id}/`)}>
            Edit event
          </Button>
        }
      </div>
    </div>
  );
};
