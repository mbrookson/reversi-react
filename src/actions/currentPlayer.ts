import { Action } from '../models/action';

export const SWITCH_PLAYER = 'SWITCH_PLAYER';

export function switchPlayer(): Action<any> {
  return {
    type: SWITCH_PLAYER
  };
}
