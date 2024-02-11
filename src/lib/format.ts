export interface FormatOptions {
  locale?: string;
  options?: Intl.NumberFormatOptions;
}

const specialChars = ['k', 'm', 'b', 't'];
const specialCharsMultiplyValue = {
  k: 1e3,
  m: 1e6,
  b: 1e9,
  t: 1e12,
};

/**
 * Format a number string (if not a number, will notify) to something nice using
 * Intl.
 */
export function format(
  value: string,
  { locale, options }: FormatOptions = {},
): string {
  if (value === '' || value === null || value === undefined) {
    return '';
  }

  let valueToBeFormatted = value.toLowerCase();
  let finalMultiplier = 1;

  if (
    specialChars.includes(valueToBeFormatted[valueToBeFormatted.length - 1])
  ) {
    finalMultiplier =
      specialCharsMultiplyValue[
        valueToBeFormatted[valueToBeFormatted.length - 1] as
          | 'k'
          | 'm'
          | 'b'
          | 't'
      ];
    valueToBeFormatted = valueToBeFormatted.slice(
      0,
      valueToBeFormatted.length - 1,
    );
  }

  let numberValue = Number(valueToBeFormatted);
  if (Number.isNaN(numberValue)) {
    return '';
  }
  numberValue *= finalMultiplier;

  const formatter = Intl.NumberFormat(locale, {
    minimumFractionDigits: 5,
    ...options,
  });

  return formatter.format(numberValue);
}
