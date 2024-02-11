import { useState } from 'react';
import './App.css';
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
  const [unit, setUnit] = useState('byte');

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
              options: { style: formatStyle, currency, unit },
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
          <Select
            value={currency}
            setValue={(newValue) => {
              setCurrency(newValue);
            }}
            name="currency"
            label="Select currency:"
            options={['GBP', 'USD', 'EUR']}
            info="Currency must be provided when using 'currency' format style."
          />
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
      </div>
    </main>
  );
}

export default App;
