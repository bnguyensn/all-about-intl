import './Select.css';
import { Info } from './Info.tsx';

export interface SelectProps {
  name: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  info?: string;
}

export function Select({
  value,
  setValue,
  name,
  label,
  options,
  info,
}: SelectProps) {
  return (
    <div className="my-select">
      <label htmlFor={`${name}-select`}>{label}</label>
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
      {info && <Info content={info} />}
    </div>
  );
}
