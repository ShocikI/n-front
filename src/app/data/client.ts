import axios from "axios";
import { Category } from "./Categories";
import { Event } from "./Event";

export const categories: Category[] = [
    {id: 0, name: 'party' },
    {id: 1, name: 'cinema' },
    {id: 2, name: 'theatre' },
    {id: 3, name: 'stand-up' },
    {id: 4, name: 'special event' },
    {id: 5, name: 'sale' },
  ];

const events: Event[] = [
{
    title: 'Jechanka',
    date: new Date('2023-12-27T18:00:00Z'),
    categoryId: 0,
    category: {id: 0, name: "party"},
    description: 'latino disco',
    price: 0.0,
    avaliable_places: 0,
},
{
    title: 'Smiechy hihy',
    date: new Date('2023-12-28T12:00:00Z'),
    categoryId: 3,
    category: {id: 3, name: "stand-up"},
    description: 'śmieszne rzeczy',
    price: 50.0,
    avaliable_places: 100,
},
{
    title: 'Makbet',
    date: new Date('2023-12-30T12:00:00Z'),
    categoryId: 2,
    category: {id: 2, name: "theatre"},
    description: 'to jest kurwa dramat',
    price: 30.0,
    avaliable_places: 300,
},
];

const axiosClient = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
    headers: {'Content-Type': 'application/json',}
})

export const client = {
    getCategories: () => categories,
    getEvents: () => {
        const response = axiosClient.get(`/events`);
        console.log(response);
    },
    getEventsByCategories: (categoryIds:number[]) => {
        const response = axiosClient.get(`/events`);
        // const response = fetch(`http://127.0.0.1:8000/api/events`)
        console.log(response);
        if (categoryIds.length) {
            return events.filter((event) => categoryIds.includes(event.categoryId));
        }
        else {
            return events
        }
    }
}