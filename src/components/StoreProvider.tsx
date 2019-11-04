import React, { createContext, useReducer, useContext } from 'react';
import rootReducer, { initialState } from '../reducers';
import { Action } from '../models/action';
import { PlayerState } from '../models/store';

type Dispatch = <T>(action: Action<T>) => void;

interface Store<S> {
  state: S;
  dispatch: Dispatch;
}

const GlobalStore = createContext({
  state: initialState,
  dispatch: (action: Action<any>) => {}
});

export const useGlobalStore = () => useContext(GlobalStore);

export const usePlayerStore = (): Store<PlayerState> => {
  const { state, dispatch } = useGlobalStore();
  return {
    state: state.player,
    dispatch
  };
};

export default ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <GlobalStore.Provider value={{ state, dispatch }}>
      {children}>
    </GlobalStore.Provider>
  );
};
