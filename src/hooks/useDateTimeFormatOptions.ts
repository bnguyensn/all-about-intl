import { useReducer } from 'react';

export type UseDateTimeFormatOptionsState = {
  locale: string | undefined;
} & Intl.DateTimeFormatOptions;

const initialState: UseDateTimeFormatOptionsState = {
  locale: 'en-GB',
};

interface BaseAction {
  type: string;
  payload?: unknown;
}

export const SET_LOCALE = 'SET_LOCALE';
interface SetLocaleAction extends BaseAction {
  type: 'SET_LOCALE';
  payload: string;
}

export const SET_OPTIONS = 'SET_OPTIONS';
interface SetOptionsAction extends BaseAction {
  type: 'SET_OPTIONS';
  payload: { key: string; value: string | number | undefined };
}

export const RESET_OPTIONS = 'RESET_OPTIONS';
interface ResetOptionsAction extends BaseAction {
  type: 'RESET_OPTIONS';
}

function parseValue(
  value: string | number | undefined,
): string | number | undefined {
  if (value === '') {
    return undefined;
  }
  return value;
}

function reducer(
  state: UseDateTimeFormatOptionsState,
  action: SetLocaleAction | SetOptionsAction | ResetOptionsAction,
) {
  if (action.type === SET_LOCALE) {
    return {
      ...state,
      locale: parseValue(action.payload) as string | undefined,
    };
  }

  if (action.type === SET_OPTIONS) {
    return { ...state, [action.payload.key]: parseValue(action.payload.value) };
  }

  if (action.type === RESET_OPTIONS) {
    return initialState;
  }

  throw Error('Invalid action');
}

export function useDateTimeFormatOptions() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
}
