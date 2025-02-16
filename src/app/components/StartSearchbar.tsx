'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';


type Props = {
  location: string,
  queryParams: string,
  areaRadius: number,
  inputRef: React.RefObject<HTMLInputElement>,
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
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        handleChangeQueryParams(`${lat}-${lng}`);
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
        <select onChange={handleOnChangeRadius}
          className='w-24 h-10 pl-1 mx-1 border-none bg-primary rounded-lg hover:text-white hover:bg-secondary focus:text-black focus:bg-primary' 
        >
          <option value="5">5 km</option>
          <option value="10">10 km</option>
          <option value="20">20 km</option>
          <option value="30">30 km</option>
          <option value="60">60 km</option>
          <option value="120">120 km</option>
          <option value="180">180 km</option>
          <option value="240">240 km</option>
        </select>

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
