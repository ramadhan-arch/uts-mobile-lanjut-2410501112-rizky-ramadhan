import { createContext, useReducer, useContext } from 'react';

const initialState = {
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(b => b.key !== action.payload),
      };
    default:
      return state;
  }
}

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  return useContext(BookContext);
}