'use client';
import { SearchBarContext } from '../Contexts';
import { AllEvents } from './AllEvents';
import SearchBar from './SearchBar';
import { useContext, useEffect, useState } from 'react';
import { client } from '../data/client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Event } from '../data/Event';


const EventPage = () => {
  const { query, setQuery } = useContext(SearchBarContext);
  const [events, setEvents] = useState<Event[]>([]);
  const searchParams = useSearchParams();
  const point = searchParams.getAll('point')[0];
  const radius = searchParams.getAll('radius')[0];
  const categoryIds = searchParams.getAll('categories').map(categoryId => (categoryId));

  useEffect(() => {
    const removeSessionStorage = (key: string) => {
      const old = sessionStorage.getItem(key)
      if (old) sessionStorage.removeItem(key)
    }
    
    const updateLocation = () => {
      removeSessionStorage("point");
      removeSessionStorage("radius");

      sessionStorage.setItem("point", point);
      sessionStorage.setItem("radius", radius);
    }
    updateLocation()

    const fetchEvents = async () => {
      const updatedPoint = sessionStorage.getItem("point");
      const updatedRadius = sessionStorage.getItem("radius");
      
      const fetchedEvents = await client.getEvents(updatedPoint, updatedRadius, categoryIds);
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  return (
    <SearchBarContext.Provider value={{ query, setQuery }}>
      <div className="flex flex-col items-start">
        <div className="p-1.5">
          <SearchBar />
        </div>
        <AllEvents events={events} />
      </div>
    </SearchBarContext.Provider>
  );
};

export default EventPage;
