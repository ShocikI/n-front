import { Category } from './Categories';

export interface Event {
  url: string;
  title: string;
  date: Date;
  address: string;
  location: string;
  description: string;
  price: number;
  avaliable_places: number;
  owner: string;
  category: Category;
  image: null | string;
}