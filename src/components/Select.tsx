import './Select.css';

export interface SelectProps {
  value: string;
  setValue: (value: string) => void;
  name: string;
  label: string;
  options: string[];
}

export function Select({ value, setValue, name, label, options }: SelectProps) {
  return (
    <div className="my-select">
      <label htmlFor={`${name}-select`}>{label}:</label>
      <select
        name={name}
        id={`${name}-select`}
        onChange={(e) => {
          setValue(e.target.value);
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
