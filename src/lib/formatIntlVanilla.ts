export interface FormatOptions {
  locale?: string;
  options?: Intl.NumberFormatOptions;
}

export function formatIntlVanilla(
  value: string,
  { locale, options }: FormatOptions,
) {
  if (value === '' || value === null || value === undefined) {
    return '';
  }

  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) {
    return 'Not a number';
  }

  const formatter = Intl.NumberFormat(locale, options);

  return formatter.format(numberValue);
}
