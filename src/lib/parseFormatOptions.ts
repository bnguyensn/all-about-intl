export function parseFormatOptions(
  rawValue: string | number | boolean | undefined,
  defaultValue?: string,
): string {
  return rawValue === undefined
    ? defaultValue
      ? defaultValue
      : ''
    : `${rawValue}`;
}
