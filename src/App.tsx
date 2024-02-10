import { useState } from "react";
import "./App.css";
import { format } from "./format";

type Locale = "en-GB" | "en-US";

function Select({
  value,
  setValue: setLocale,
  name,
  options,
}: {
  value: string;
  setValue: (value: string) => void;
  name: string;
  options: string[];
}) {
  return (
    <div className="my-select">
      <label htmlFor={`${name}-select`}>Select {name}:</label>
      <select
        name={name}
        id={`${name}-select`}
        onChange={(e) => {
          setLocale(e.target.value);
        }}
        value={value}
      >
        <option value="">--Please choose an option--</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale | "">("en-GB");
  const [isPercent, setIsPercent] = useState<string>("false");

  const [input, setInput] = useState("");

  return (
    <div>
      <h1>
        <pre>Intl.NumberFormat</pre>
      </h1>
      <div className="inputs-container">
        <Select
          value={locale}
          setValue={(newValue) => {
            setLocale(newValue as Locale | "");
          }}
          name="locale"
          options={["en-GB", "en-US", "vi"]}
        />
        <Select
          value={isPercent}
          setValue={(newValue) => {
            setIsPercent(newValue);
          }}
          name="is-percent"
          options={["true", "false"]}
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
          Formatted:{" "}
          <span className="formatted-value">
            {format(input, {
              locale,
              isPercent: isPercent === "true" ? true : false,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
