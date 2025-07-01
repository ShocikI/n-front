'use client';
import React, { ChangeEvent, useContext, useState } from 'react';
import { SearchBarContext } from '../Contexts';

export const SearchBar = () => {
  const { query, setQuery } = useContext(SearchBarContext);
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="box-border my-auto">
      <div className="h-12">
        <input type="text" placeholder="Search by name" onChange={handleOnChange} value={query} />
      </div>
    </div>
  );
};
