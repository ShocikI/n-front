'use client';
import React, { ChangeEvent, useContext, useState } from 'react';
import { SearchBarContext } from '../Contexts';

const SearchBar = () => {
  const { query, setQuery } = useContext(SearchBarContext);
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="box-border my-auto">
      <div className="pxt-80 h-12">
        <input type="text" placeholder="" onChange={handleOnChange} value={query} />
      </div>
    </div>
  );
};

export default SearchBar;
