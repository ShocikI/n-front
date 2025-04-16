'use client';

import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

import { Event } from '../data/interfaces';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { client } from '../data/client';

dayjs.locale('pl');

type Props = { 
  event: Event,
  isOwner: boolean
};

export const EventComponent: FC<Props> = ({ event, isOwner }) => {
  const router = useRouter();
  const [isHide, setIsHide] = useState<boolean>(true);
  const handleHiddingDetails = () => setIsHide(!isHide);
  const angleIcon = isHide ? faAngleDown : faAngleUp;
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <div className="flex flex-col box-border m-2 p-4 max-w-[800px] border-2 border-primary">
      <div className="flex flex-row place-content-between px-1.5">
        <Label className="font-bold">{event.title}</Label>
        <button className="text-xs" onClick={handleHiddingDetails}>
          {clsx(isHide && 'Show', !isHide && 'Hide', ' details')}
          <FontAwesomeIcon icon={angleIcon} className="pl-2" />
        </button>
      </div>
      <div className={clsx('flex flex-row justify-between pl-1.5 mt-4', !isHide && 'block', isHide && 'hidden')}>
        <div className='flex flex-col gap-2'>
          <Label>{dayjs(event.date).format('LLL')}</Label>
          <Label>Kategoria: {event.category.title}</Label>
          { !!event.price &&
            <Label>Cena: {event.price} zł</Label>
            }
          { !!event.avaliable_places &&
            <Label>Dostępne miejsca: {event.avaliable_places}</Label>
            }
          { !!event.description &&
            <Label>{event.description}</Label>
            }
        </div>
        <div className='flex flex-col items-end justify-between'>
          { !!event.image &&
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/${event.image}`} className='min-w-[160px] h-fit p-4'/>          
          }
          { isOwner &&
            <Button onClick={() => router.push(`/events/${event.id}/`)}>
              Edit event
            </Button>
          }
        </div>
      </div>
    </div>
  );
};
