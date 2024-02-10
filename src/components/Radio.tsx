export interface RadioProps {
  name: string;
  label: string;
  value: string;
  setValue: (newValue: string) => void;
  options: string[];
}

export function Radio({ name, label, value, setValue, options }: RadioProps) {
  return (
    <fieldset
      className="my-radio"
      onChange={(e) => {
        // @ts-expect-error TODO
        // eslint-disable-next-line
        setValue(e.target.value);
      }}
    >
      <legend>{label}</legend>
      <div className="radio-inputs-container">
        {options.map((option) => (
          <span key={option}>
            <input
              id={`${name}-radio-option-${option}`}
              name={name}
              type="radio"
              value={option}
              checked={value === option}
            />
            <label htmlFor={`${name}-radio-option-${option}`}>{option}</label>
          </span>
        ))}
      </div>
    </fieldset>
  );
}
