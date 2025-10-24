/**
 * Parses a formatted number string to extract prefix, suffix, numeric value, and decimal places
 * Supports common formats like: £8.2M, 87%, 12+, 1,234.56
 */
export function parseFormattedNumber(input: string | number) {
  const s = String(input).trim();

  // Extract prefix (currency symbols, etc.) - everything before first digit/minus/plus
  const prefix = s.match(/^[^\d\-+]+/)?.[0] ?? "";

  // Extract suffix (%, +, M, K, etc.) - everything after last digit
  const suffix = s.match(/[^\d,.\s]+$|[%+]+$/)?.[0] ?? "";

  // Extract numeric part by removing all non-numeric characters except decimal points and minus
  const numericString = s.replace(/[^\d.-]/g, "");
  const numeric = Number(numericString);

  // Count decimal places in original string
  const decimalPart = s.split(".")[1];
  const decimals = decimalPart ? decimalPart.replace(/[^\d]/g, "").length : 0;

  return { prefix, suffix, numeric, decimals };
}

/**
 * Formats a number to match the style of the original input
 * Preserves prefix, suffix, thousand separators, and decimal places
 */
export function formatNumberLike(
  original: string | number,
  value: number
): string {
  const { prefix, suffix, decimals } = parseFormattedNumber(original);

  // Handle edge cases
  if (isNaN(value)) return String(original);

  // Format to correct decimal places
  const fixed = Math.abs(value).toFixed(decimals);
  const [integerPart, decimalPart] = fixed.split(".");

  // Add thousand separators
  const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Construct final string
  const sign = value < 0 ? "-" : "";
  const formattedNumber = withCommas + (decimalPart ? "." + decimalPart : "");

  return sign + prefix + formattedNumber + suffix;
}
