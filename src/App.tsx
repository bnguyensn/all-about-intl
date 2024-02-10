import { useState } from 'react';
import './App.css';
import { Select } from './components/Select.tsx';
import { format } from './lib/format.ts';

type Locale = 'en-GB' | 'en-US';

function App() {
  const [locale, setLocale] = useState<Locale | ''>('en-GB');
  const [isPercent, setIsPercent] = useState<string>('false');

  const [input, setInput] = useState('');

  return (
    <div>
      <h1>
        <pre>Intl.NumberFormat</pre>
      </h1>
      <div className="inputs-container">
        <Select
          value={locale}
          setValue={(newValue) => {
            setLocale(newValue as Locale | '');
          }}
          name="locale"
          label="Select locale:"
          options={['en-GB', 'en-US', 'vi']}
        />
        <div>
          <label htmlFor="number-input">To be formatted:</label>
          <input
            id="number-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          Formatted:{' '}
          <span className="formatted-value">
            {format(input, {
              locale,
              isPercent: isPercent === 'true',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
