import { Category } from './Categories';

export interface Event {
  title: string;
  date: Date;
  categoryId: number;
  category: Category;
  description: string;
  price: number;
  avaliable_places: number;
}
