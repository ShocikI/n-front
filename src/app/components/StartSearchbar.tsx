'use client';
import React, { useState, useContext, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AddressContext } from '../Contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassLocation, faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';

const StartSearchbar = () => {
  const [text, setText] = useState('');
  const router = useRouter();
  let context = useContext(AddressContext);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value);

  
  const handleGetCurrentLocation = () => {
    context = text;
    router.push(`/events?${text}`);
  };

  const handleGetLocationFromSearchbar = () => {
    context = text;
    router.push(`/events?${text}`);
  };

  return (
    <div className="w-full pl-[10px] bg-white rounded-t-xl">
      <div className="flex flex-row justify-end pt-1 pxt-80 h-12">
        
        <input name="search-input" type="text" placeholder="Where you are?" 
        className='w-full pr-4 border-none'
        onChange={handleOnChange} />

        <button className='box-border' type="submit" onClick={handleGetCurrentLocation}>
          <FontAwesomeIcon className='size-4 mx-2 hover:text-secondary' icon={faLocationCrosshairs} />
        </button>

        <button className='box-border' type="submit" onClick={handleGetLocationFromSearchbar}>
          <FontAwesomeIcon className='size-6 mx-2 hover:text-secondary' icon={faMagnifyingGlassLocation} />
        </button>

      </div>
    </div>
  );
};

export default StartSearchbar;
