import { useState } from 'react';
import { useDateTimeFormatOptions } from '../hooks/useDateTimeFormatOptions';
import { NavBar } from '../components/NavBar';

function getInitialInput() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() - 1;
  const date = today.getDate();
  return `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}T00:00`;
}

export function DateTimeFormatPage() {
  const {
    state: { locale, ...formatOptions },
    dispatch,
  } = useDateTimeFormatOptions();

  const [input, setInput] = useState(() => getInitialInput());

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
