'use client';
import React from 'react';
import { client } from '../data/client';
import { useSearchParams, useRouter } from 'next/navigation';

export const EventForm = () => {
  const categories = client.getCategories();
  const categoriesRadios = categories.map(cat => (
    <>
      <label>{cat.name}</label>
      <input type="radio" name="category_select" id={cat.name} value={cat.id} />
    </>
  ));

  const router = useRouter();

  const handleCancelling = () => router.push(`/events`);

  return (
    <div className="flex flex-col box-border m-2 p-1 w-full border-2 border-primary">
      <h1>Create new event</h1>
      <form method="POST" action="/events">
        <div>
          <label>Title:</label>
          <input type="text" name="title" required />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" name="time" required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" required />
        </div>
        <div>
          <label>Category:</label>
          <div>{categoriesRadios}</div>
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" min="0" />
        </div>
        <div>
          <label>Avaliable places:</label>
          <input type="number" name="avaliable_places" min="0" />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" />
        </div>
        <div>
          <input type="submit" value="Create event" />
        </div>
      </form>
      <button onClick={handleCancelling}>Cancel</button>
    </div>
  );
};
