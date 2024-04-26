import { useState } from 'react';
import {
  RESET_OPTIONS,
  useDateTimeFormatOptions,
} from '../hooks/useDateTimeFormatOptions';
import { NavBar } from '../components/NavBar';
import { FormatOutputWithErrorBoundary } from '../components/FormatOutput';

function dateToInput(d: Date): string {
  const year = d.getFullYear();
  const month = d.getMonth() - 1;
  const date = d.getDate();
  return `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}T00:00`;
}

function inputToDate(input: string): Date {
  const split = input.split('T');
  const [year, month, date] = split[0].split('-').map(Number);
  const [hours, minutes] = split[1].split(':').map(Number);
  return new Date(year, month - 1, date, hours, minutes);
}

export function DateTimeFormatPage() {
  const {
    state: { locale, ...formatOptions },
    dispatch,
  } = useDateTimeFormatOptions();

  const [input, setInput] = useState(() => dateToInput(new Date()));

  return (
    <main>
      <NavBar />
      <h1>
        <pre>Intl.DateTimeFormat</pre>
      </h1>
      <div className="formatter-container">
        <input
          type="datetime-local"
          id="intl-date-time-format"
          name="intl-date-time-format"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <FormatOutputWithErrorBoundary
          input={input}
          formatter={(inp) => {
            const formatter = Intl.DateTimeFormat(locale, formatOptions);
            return formatter.format(inputToDate(inp));
          }}
          reset={() => {
            setInput('0');
            dispatch({ type: RESET_OPTIONS });
          }}
        />
      </div>
    </main>
  );
}
