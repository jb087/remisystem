import { useReducer, useCallback } from 'react';

export const ADD = 'ADD';
export const FILTER = 'FITLER';
export const SET = 'SET';

function reducer(state, action) {
  switch (action.type) {
    case SET:
      return action.array;
    case ADD:
      return [...state, action.element];
    case FILTER:
      return state.filter(action.fn);
    default:
      throw new Error();
  }
}

export default function useArrayWithFilter(initialArray) {
  const [array, dispatch] = useReducer(reducer, initialArray);
  const addElement = useCallback(
    (element) => dispatch({ type: ADD, element }),
    [dispatch]
  );
  const filter = useCallback((fn) => dispatch({ type: FILTER, fn }), [
    dispatch,
  ]);
  const setArray = useCallback((array) => dispatch({ type: SET, array }), [
    dispatch,
  ]);

  return [array, addElement, filter, setArray];
}
