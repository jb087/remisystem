import { useReducer, useCallback } from 'react';

export const SET_DURING_SING_UP = 'SET_DURING_SING_UP';
export const SET_USER = 'SET_USER';

const initialState = { user: null, isDuringSingUp: false };

function reducer(state, action) {
  switch (action.type) {
    case SET_DURING_SING_UP:
      const { isDuringSingUp } = action;
      return { isDuringSingUp, user: isDuringSingUp ? null : state.user };
    case SET_USER:
      if (state.isDuringSingUp) {
        return state;
      }
      return { ...state, user: action.user };
    default:
      throw new Error();
  }
}

export default function useSignIn() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setUser = useCallback((user) => dispatch({ type: SET_USER, user }), [
    dispatch,
  ]);
  const setIsDuringSignUp = useCallback(
    (isDuringSingUp) => dispatch({ type: SET_DURING_SING_UP, isDuringSingUp }),
    [dispatch]
  );

  return [state.user, state.isDuringSingUp, setUser, setIsDuringSignUp];
}
