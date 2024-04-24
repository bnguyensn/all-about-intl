import { useState } from 'react';
import { useDateTimeFormatOptions } from '../hooks/useDateTimeFormatOptions';
import { NavBar } from '../components/NavBar';

export function DateTimeFormatPage() {
  const {
    state: { locale, ...formatOptions },
    dispatch,
  } = useDateTimeFormatOptions();

  const [input, setInput] = useState('2024-01-01T00:00');

  return (
    <main>
      <NavBar />
      <h1>
        <pre>Intl.DateFormat</pre>
      </h1>
      <div className="formatter-container">
        <input
          type="datetime-local"
          id="intl-date-time-format"
          name="intl-date-time-format"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </main>
  );
}
