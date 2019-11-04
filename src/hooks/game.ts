import { Reducer, useState } from 'react';
import { GameState } from '../models/store';
import { Action } from '../models/action';

export const useGameReducer = (
  reducer: Reducer<GameState, Action<any>>,
  initialState: GameState
) => {
  const [state, setState] = useState<GameState>(initialState);

  function dispatch(action: Action<any>) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
};
