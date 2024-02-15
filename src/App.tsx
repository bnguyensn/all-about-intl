import { useState } from 'react';
import './App.css';
import { NumberInput } from './components/NumberInput.tsx';
import { Radio } from './components/Radio.tsx';
import { Select } from './components/Select.tsx';
import { TextInput } from './components/TextInput.tsx';
import { format } from './lib/format.ts';

type Locale = 'en-GB' | 'en-US';

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
  const [minIntDigits, setMinIntDigits] = useState('1');
  const [minFractionDigits, setMinFractionDigits] = useState('0');

  const [input, setInput] = useState('10000000');

  return (
    <main>
      <h1>
        <pre>Intl.NumberFormat</pre>
      </h1>
      <div className="formatter-container">
        <TextInput
          value={input}
          setValue={setInput}
          name="number-to-be-formatted"
          label="To be formatted:"
        />
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
                minimumIntegerDigits: Number(minIntDigits),
                minimumFractionDigits: Number(minFractionDigits),
              },
            })}
          </span>
        </span>
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
          <Select
            value={unit}
            setValue={(newValue) => {
              setUnit(newValue);
            }}
            name="unit"
            label="Select unit:"
            options={['byte', 'kilobyte', 'megabyte', 'gigabyte']}
            info="Unit must be provided when using 'unit' format style."
          />
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
      </div>
    </main>
  );
}

export default App;
