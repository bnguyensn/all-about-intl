import { useReducer } from 'react';

export type UseFormatOptionsState = {
  locale: string;
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

function reducer(
  state: UseFormatOptionsState,
  action: SetLocaleAction | SetOptionsAction,
) {
  if (action.type === SET_LOCALE) {
    return { ...state, locale: action.payload };
  }

  if (action.type === SET_OPTIONS) {
    return { ...state, [action.payload.key]: action.payload.value };
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
