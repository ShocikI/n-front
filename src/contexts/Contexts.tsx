import { createContext, Dispatch, SetStateAction } from 'react';

type SearchbarContextType = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

export const SearchBarContext = createContext<SearchbarContextType>({
  query: '',
  setQuery: () => {},
});
