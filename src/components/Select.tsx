import './Select.css';
import { InfoWrapper, InfoWrapperProps } from './InfoWrapper.tsx';

export interface SelectProps {
  name: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  noEmptyValue?: boolean;
  disabled?: boolean;
  info?: InfoWrapperProps['info'];
}

export function Select({
  value,
  setValue,
  name,
  label,
  options,
  noEmptyValue,
  disabled,
  info,
}: SelectProps) {
  const selectComponent = (
    <div className="my-select">
      <label htmlFor={`${name}-select`}>{label}</label>
      <select
        name={name}
        id={`${name}-select`}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        disabled={disabled}
      >
        {!noEmptyValue && <option value="">--Please choose an option--</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return info ? (
    <InfoWrapper info={info}>{selectComponent}</InfoWrapper>
  ) : (
    selectComponent
  );
}
