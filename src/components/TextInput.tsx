import { Info } from './Info.tsx';
import './TextInput.css';

export interface TextInputProps {
  value: string;
  setValue: (value: string) => void;
  name: string;
  label: string;
  info?: string;
}

export function TextInput({
  value,
  setValue,
  name,
  label,
  info,
}: TextInputProps) {
  return (
    <div className="my-text-input">
      <label htmlFor={`${name}-text-input`}>{label}</label>
      <input
        type="text"
        name={name}
        id={`${name}-text-input`}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {info && <Info content={info} />}
    </div>
  );
}
