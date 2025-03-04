'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';
import { RadiusSelect } from './RadiusSelect';

type Props = {
  location: string,
  queryParams: string,
  areaRadius: number,
  inputRef: React.RefObject<HTMLInputElement>,
  onSearch: (address: string) => void,
  handleChangeQueryParams: (newQueryParams: string) => void,
  handleChangeLocation: (address: string) => void,
  handleSetRadius: (radius: number) => void
}

const StartSearchbar = ({
  location, queryParams, areaRadius, inputRef,
  handleChangeQueryParams, handleChangeLocation, handleSetRadius
}: Props) => {
  const router = useRouter();

  const handleOnChangeLocation = (e: any) => handleChangeLocation(e.target.value);

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        handleChangeQueryParams(`${lng}-${lat}`);
        routeToEventsView()
      }
    );
  };

  const handleOnChangeRadius = (e: any) => handleSetRadius(e.target.value);

  const routeToEventsView = () => {
    if ( queryParams ) {
      router.push(`/events?point=${queryParams}&radius=${areaRadius}`);
    };
  };

  return (
    <div className="w-full pl-[10px] bg-white rounded-t-xl">
      <div className="flex flex-row justify-end pt-1 pxt-80 h-12">
        <input ref={inputRef} placeholder="Where you are?" value={location} 
          className='w-full pl-2 pr-4 border-none' onChange={handleOnChangeLocation} 
        />

        <RadiusSelect handleOnChangeRadius={handleOnChangeRadius}/>

        <button className='box-border h-10 w-10' type="submit" onClick={handleGetCurrentLocation}>
          <FontAwesomeIcon icon={faLocationCrosshairs} 
            className='size-4 mx-2 hover:text-secondary' 
          />
        </button>

        <button className='box-border' type="submit" onClick={routeToEventsView}>
          <FontAwesomeIcon icon={faArrowRight} 
            className='size-6 mx-1 p-2 rounded-lg bg-primary hover:text-white hover:bg-secondary' 
          />
        </button>
      </div>
    </div>
  );
};

export default StartSearchbar;
