'use client';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchBarContext } from '@/contexts/Contexts';
import { client } from '@/utils/client';
import { Event } from '@/utils/interfaces';
import { AllEvents } from '../../components/layout/components/AllEvents';
import { SearchBar } from '@/components/layout/SearchBar';



export const EventsPage = () => {
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
      <div className="flex flex-col items-center w-4/5">
        <div className="p-1.5">
          <SearchBar />
        </div>
        <AllEvents events={events} />
      </div>
    </SearchBarContext.Provider>
  );
};

