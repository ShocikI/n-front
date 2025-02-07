'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';


type Props = {
  location: string,
  queryParams: string,
  handleChangeQueryParams: (newQueryParams: string) => void,
  handleChangeLocation: (address: string) => void,
  inputRef: React.RefObject<HTMLInputElement>
}

const StartSearchbar = ({location, queryParams, handleChangeQueryParams, handleChangeLocation, inputRef}: Props) => {
  const router = useRouter();

  const handleOnChange = (e: any) => handleChangeLocation(e.target.value);

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        handleChangeQueryParams(`${lat}-${lng}`);
        routeToEventsView()
      }
    );
  };

  const routeToEventsView = () => {
    if ( queryParams ) {
      router.push(`/events?point=${queryParams}`);
    };
  };

  return (
    <div className="w-full pl-[10px] bg-white rounded-t-xl">
      <div className="flex flex-row justify-end pt-1 pxt-80 h-12">
        <input ref={inputRef} placeholder="Where you are?" value={location} className='w-full pr-4 border-none' onChange={handleOnChange} />

        <button className='box-border' type="submit" onClick={handleGetCurrentLocation}>
          <FontAwesomeIcon className='size-4 mx-2 hover:text-secondary' icon={faLocationCrosshairs} />
        </button>

        <button className='box-border' type="submit" onClick={routeToEventsView}>
          <FontAwesomeIcon className='size-6 mx-1 p-2 rounded-lg bg-primary hover:text-white hover:bg-secondary' icon={faArrowRight} />
        </button>

      </div>
    </div>
  );
};

export default StartSearchbar;
