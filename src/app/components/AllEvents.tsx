'use client';
import React, { FC, useContext } from 'react';
import { SearchBarContext } from '../Contexts';
import { Event } from '../data/Event';
import { EventComponent } from './EventComponent';

type Props = { events: Event[] };

export const AllEvents: FC<Props> = ({ events }) => {
  const { query } = useContext(SearchBarContext);
  const filteredEvents = events.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <ul>
        {filteredEvents.map(e => (
          <EventComponent event={e} key={e.category.id} />
        ))}
      </ul>
    </div>
  );
};
