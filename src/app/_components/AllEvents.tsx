'use client';
import React, { FC, useContext } from 'react';
import { SearchBarContext } from '../Contexts';
import { Event } from '../../_utils/interfaces';
import { EventComponent } from './EventComponent';

type Props = { events: Event[] };

export const AllEvents: FC<Props> = ({ events }) => {
  const { query } = useContext(SearchBarContext);
  const filteredEvents = events.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className='w-full'>
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