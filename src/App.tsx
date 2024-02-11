import { useState } from 'react';
import './App.css';
import { Radio } from './components/Radio.tsx';
import { Select } from './components/Select.tsx';
import { format } from './lib/format.ts';

type Locale = 'en-GB' | 'en-US';

function App() {
  const [locale, setLocale] = useState<Locale | ''>('en-GB');
  const [isPercent, setIsPercent] = useState<'true' | 'false'>('false');

  const [input, setInput] = useState('');

  return (
    <div>
      <h1>
        <pre>Intl.NumberFormat</pre>
      </h1>
      <div className="formatter-container">
        <div>
          <label htmlFor="number-input">To be formatted:</label>
          <input
            id="number-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <span>
          {input === '' ? 'Nothing to format' : 'Formatted value:'}
          <span className="formatted-value">
            {format(input, {
              locale,
              isPercent: isPercent === 'true',
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
          info="Determines the locale used. Use navigator.language to find the browser's current locale."
        />
        <Radio
          name="is-percent"
          label="Is percent:"
          value={`${isPercent}`}
          setValue={(newValue) => setIsPercent(newValue as 'true' | 'false')}
          options={['true', 'false']}
        />
      </div>
    </div>
  );
}

export default App;
