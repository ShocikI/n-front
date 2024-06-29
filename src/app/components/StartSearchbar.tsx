'use client';
import React, { useState, useContext, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AddressContext } from '../Contexts';

const StartSearchbar = () => {
  const [text, setText] = useState('');
  const router = useRouter();
  let context = useContext(AddressContext);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value);

  const handleOnClick = () => {
    context = text;
    router.push(`/events?${text}`);
  };

  return (
    <div className="box-border my-auto">
      <div className="pxt-80 h-12">
        <input name="search-input" type="text" placeholder="Gdzie jesteś?" onChange={handleOnChange} />
        <button className="btn btn-primary px-4 ml-4" type="submit" onClick={handleOnClick}>
          Szukaj
        </button>
      </div>
    </div>
  );
};

export default StartSearchbar;
