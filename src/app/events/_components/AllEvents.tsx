'use client';
import React, { FC, useContext } from 'react';
import { SearchBarContext } from '../../../contexts/Contexts';
import { Event } from '../../../utils/interfaces';
import { EventComponent } from '../../../components/layout/components/EventComponent';

type Props = { events: Event[] };

export const AllEvents: FC<Props> = ({ events }) => {
  const { query } = useContext(SearchBarContext);
  const filteredEvents = events.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className='flex flex-row flex-wrap justify-evenly gap-2'>
      {filteredEvents.map(e => (
        <EventComponent 
          event={e} 
          key={e.id} 
          isOwner={false}
        />
      ))}
    </div>
  );
};