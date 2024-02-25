import { useReducer } from 'react';

export type UseFormatOptionsState = {
  locale: string | undefined;
} & Intl.NumberFormatOptions & {
    // Modern properties not yet supported by TypeScript
    roundingPriority?: 'auto' | 'morePrecision' | 'lessPrecision';
    roundingIncrement?: number;
    roundingMode?:
      | 'ceil'
      | 'floor'
      | 'expand'
      | 'trunc'
      | 'halfCeil'
      | 'halfFloor'
      | 'halfExpand'
      | 'halfTrunc'
      | 'halfEven';
    trailingZeroDisplay?: 'auto' | 'stripIfInteger';
    useGrouping?: 'always' | 'auto' | 'min2' | true | false;
  };

const initialState: UseFormatOptionsState = {
  locale: 'en-GB',
  style: 'decimal',
  currency: 'GBP',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  unit: 'acre',
  unitDisplay: 'short',
  roundingPriority: 'auto',
  roundingIncrement: 1,
  roundingMode: 'halfExpand',
  trailingZeroDisplay: 'auto',
  notation: 'standard',
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
  state: UseFormatOptionsState,
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

export function useFormatOptions() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
}
