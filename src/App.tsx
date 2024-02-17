import { useEffect, useState } from 'react';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import { NumberInput } from './components/NumberInput.tsx';
import { Radio } from './components/Radio.tsx';
import { Select } from './components/Select.tsx';
import { TextInput } from './components/TextInput.tsx';
import units from './config/units.json';
import { format } from './lib/format.ts';

type Locale = 'en-GB' | 'en-US';

const LOCAL_STORAGE_VALUE_KEY = 'inputValue';

function fallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div>
      <span className="error-message">{error.message}</span>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale | ''>('en-GB');
  const [formatStyle, setFormatStyle] =
    useState<Intl.NumberFormatOptions['style']>('decimal');
  const [currency, setCurrency] = useState('GBP');
  const [currencyDisplay, setCurrencyDisplay] =
    useState<Intl.NumberFormatOptions['currencyDisplay']>('symbol');
  const [currencySign, setCurrencySign] =
    useState<Intl.NumberFormatOptions['currencySign']>('standard');
  const [unit, setUnit] = useState('byte');
  const [minIntDigits, setMinIntDigits] = useState('');
  const [minFractionDigits, setMinFractionDigits] = useState('');
  const [maxFractionDigits, setMaxFractionDigits] = useState<string>('');
  const [minSignificantDigits, setMinSignificantDigits] = useState<string>('');
  const [maxSignificantDigits, setMaxSignificantDigits] = useState<string>('');
  const [roundingPriority, setRoundingPriority] = useState<
    'auto' | 'morePrecision' | 'lessPrecision'
  >('auto');
  const [unitDisplay, setUnitDisplay] =
    useState<Intl.NumberFormatOptions['unitDisplay']>('short');

  const [input, setInput] = useState('10000000');

  useEffect(() => {
    const savedInput = localStorage.getItem(LOCAL_STORAGE_VALUE_KEY);
    if (savedInput) {
      setInput(savedInput);
    }
  }, []);

  return (
    <main>
      <h1>
        <pre>Intl.NumberFormat</pre>
      </h1>
      <div className="formatter-container">
        <TextInput
          value={input}
          setValue={(newValue) => {
            setInput(newValue);
            localStorage.setItem(LOCAL_STORAGE_VALUE_KEY, newValue);
          }}
          name="number-to-be-formatted"
          label="To be formatted:"
        />
        <ErrorBoundary fallbackRender={fallbackRender}>
          <span>
            {input === '' ? 'Nothing to format' : 'Formatted value: '}
            <span className="formatted-value">
              {format(input, {
                locale,
                options: {
                  style: formatStyle,
                  currency,
                  currencyDisplay,
                  currencySign,
                  unit,
                  unitDisplay,
                  minimumIntegerDigits: minIntDigits
                    ? Number(minIntDigits)
                    : undefined,
                  minimumFractionDigits: minFractionDigits
                    ? Number(minFractionDigits)
                    : undefined,
                  maximumFractionDigits: maxFractionDigits
                    ? Number(maxFractionDigits)
                    : undefined,
                  minimumSignificantDigits: minSignificantDigits
                    ? Number(minSignificantDigits)
                    : undefined,
                  maximumSignificantDigits: maxSignificantDigits
                    ? Number(maxSignificantDigits)
                    : undefined,
                  // @ts-expect-error TODO this property exists but not in TS library
                  roundingPriority,
                },
              })}
            </span>
          </span>
        </ErrorBoundary>
      </div>
      <div className="inputs-container">
        <Select
          value={locale}
          setValue={(newValue) => {
            setLocale(newValue as Locale | '');
          }}
          name="locale"
          label="Select locale:"
          options={['en-GB', 'en-US', 'vi']}
          info={`Determines the locale used. Your browser's locale is "${navigator.language}".`}
        />
        <Radio
          name="format-style"
          label="Style:"
          value={`${formatStyle}`}
          setValue={(newValue) =>
            setFormatStyle(newValue as Intl.NumberFormatOptions['style'])
          }
          options={['decimal', 'currency', 'percent', 'unit']}
        />
        {formatStyle === 'currency' && (
          <>
            <Select
              value={currency}
              setValue={(newValue) => {
                setCurrency(newValue);
              }}
              name="currency"
              label="Select currency:"
              options={['GBP', 'USD', 'EUR']}
              noEmptyValue
              info="Currency must be provided when using 'currency' format style."
            />
            <Radio
              name="currency-display"
              label="Currency display:"
              value={`${currencyDisplay}`}
              setValue={(newValue) =>
                setCurrencyDisplay(
                  newValue as Intl.NumberFormatOptions['currencyDisplay'],
                )
              }
              options={['code', 'symbol', 'narrowSymbol', 'name']}
            />
            <Radio
              name="currency-sign"
              label="Currency sign:"
              value={`${currencySign}`}
              setValue={(newValue) =>
                setCurrencySign(
                  newValue as Intl.NumberFormatOptions['currencySign'],
                )
              }
              options={['standard', 'accounting']}
              info="'Accounting' will use parentheses for negative values."
            />
          </>
        )}
        {formatStyle === 'unit' && (
          <>
            <Select
              value={unit}
              setValue={(newValue) => {
                setUnit(newValue);
              }}
              name="unit"
              label="Select unit:"
              options={units}
              info="Unit must be provided when using 'unit' format style."
            />
            <Radio
              name="unit-display"
              label="Unit display:"
              value={`${unitDisplay}`}
              setValue={(newValue) =>
                setUnitDisplay(
                  newValue as Intl.NumberFormatOptions['unitDisplay'],
                )
              }
              options={['short', 'narrow', 'long']}
            />
          </>
        )}
        <NumberInput
          value={minIntDigits}
          setValue={(newValue) => {
            setMinIntDigits(newValue);
          }}
          name="min-int-digits"
          label="Minimum integer digits:"
          min={1}
          max={21}
          info="A value with a smaller number of integer digits than this number will be left-padded with zeros when formatted."
        />
        <NumberInput
          value={minFractionDigits}
          setValue={(newValue) => {
            setMinFractionDigits(newValue);
          }}
          name="min-fraction-digits"
          label="Minimum fraction digits:"
          min={0}
          max={20}
        />
        <NumberInput
          value={maxFractionDigits}
          setValue={(newValue) => {
            setMaxFractionDigits(newValue);
          }}
          name="max-fraction-digits"
          label="Maximum fraction digits:"
          min={0}
          max={20}
          info="Leave empty for default behaviour."
        />
        <NumberInput
          value={minSignificantDigits}
          setValue={(newValue) => {
            setMinSignificantDigits(newValue);
          }}
          name="min-significant-digits"
          label="Minimum significant digits:"
          min={1}
          max={21}
        />
        <NumberInput
          value={maxSignificantDigits}
          setValue={(newValue) => {
            setMaxSignificantDigits(newValue);
          }}
          name="max-significant-digits"
          label="Maximum significant digits:"
          min={1}
          max={21}
        />
        <Radio
          name="rounding-priority"
          label="Rounding priority:"
          value={roundingPriority}
          setValue={(newValue) =>
            setRoundingPriority(
              newValue as 'auto' | 'morePrecision' | 'lessPrecision',
            )
          }
          options={['auto', 'morePrecision', 'lessPrecision']}
          info="Determines how rounding conflicts will be resolved when both fraction digits and significant digits are specified. 'Auto' means prioritising significant digits."
        />
      </div>
    </main>
  );
}

export default App;
