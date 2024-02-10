export interface FormatOptions {
  locale?: string;
  isPercent?: boolean;
}

const specialChars = ["k", "m", "b", "t"];
const specialCharsMultiplyValue = {
  k: 1e3,
  m: 1e6,
  b: 1e9,
  t: 1e12,
};

export function format(
  value: string,
  { locale, isPercent }: FormatOptions = {},
): string {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  let valueToBeFormatted = value.toLowerCase();
  let finalMultiplier = 1;

  if (
    specialChars.includes(valueToBeFormatted[valueToBeFormatted.length - 1])
  ) {
    finalMultiplier =
      specialCharsMultiplyValue[
        valueToBeFormatted[valueToBeFormatted.length - 1] as
          | "k"
          | "m"
          | "b"
          | "t"
      ];
    valueToBeFormatted = valueToBeFormatted.slice(
      0,
      valueToBeFormatted.length - 1,
    );
  }

  let numberValue = Number(valueToBeFormatted);
  if (Number.isNaN(numberValue)) {
    return "";
  }
  numberValue *= finalMultiplier;

  const formatter = Intl.NumberFormat(locale, {
    style: isPercent ? "percent" : "decimal",
    minimumFractionDigits: 5,
  });

  return formatter.format(numberValue);
}
