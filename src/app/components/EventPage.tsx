'use client';
import { SearchBarContext } from '../Contexts';
import { AllEvents } from './AllEvents';
import SearchBar from './SearchBar';
import { useContext } from 'react';
import { client } from '../data/client';
import { useSearchParams, useRouter } from 'next/navigation';

const EventPage = () => {
  const { query, setQuery } = useContext(SearchBarContext);
  const searchParams = useSearchParams();
  const numberParams = searchParams.getAll('categories').map(categoryId => Number(categoryId));
  const events = client.getEventsByCategories(numberParams);
  const router = useRouter();

  const relocateToEventForm = () => {
    router.push(`/events/newEvent`);
  };

  return (
    <SearchBarContext.Provider value={{ query, setQuery }}>
      <div className="flex flex-col">
        <div className="flex flex-row place-content-between p-1.5">
          <SearchBar />
          <button onClick={relocateToEventForm}>Create new event</button>
        </div>
        <AllEvents events={events} />
      </div>
    </SearchBarContext.Provider>
  );
};

export default EventPage;
