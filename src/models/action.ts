import { ReducerAction } from 'react';

export interface Action<T> {
  type: string;
  payload?: T;
}
