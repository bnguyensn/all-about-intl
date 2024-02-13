import './Select.css';
import { Info } from './Info.tsx';

export interface SelectProps {
  name: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  noEmptyValue?: boolean;
  info?: string;
}

export function Select({
  value,
  setValue,
  name,
  label,
  options,
  noEmptyValue,
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
        {!noEmptyValue && <option value="">--Please choose an option--</option>}
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
