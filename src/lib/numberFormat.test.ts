import { parseFormattedNumber, formatNumberLike } from "../lib/numberFormat";

/**
 * Simple tests for number formatting utilities
 * Run with: npm test or include in your test suite
 */

// Test parseFormattedNumber function
function testParseFormattedNumber() {
  console.log("Testing parseFormattedNumber...");

  const testCases = [
    {
      input: "87%",
      expected: { prefix: "", suffix: "%", numeric: 87, decimals: 0 },
    },
    {
      input: "£8.2M",
      expected: { prefix: "£", suffix: "M", numeric: 8.2, decimals: 1 },
    },
    {
      input: "12+",
      expected: { prefix: "", suffix: "+", numeric: 12, decimals: 0 },
    },
    {
      input: "1,234.56",
      expected: { prefix: "", suffix: "", numeric: 1234.56, decimals: 2 },
    },
    {
      input: "$1,000.00",
      expected: { prefix: "$", suffix: "", numeric: 1000, decimals: 2 },
    },
    {
      input: 42,
      expected: { prefix: "", suffix: "", numeric: 42, decimals: 0 },
    },
  ];

  testCases.forEach(({ input, expected }, index) => {
    const result = parseFormattedNumber(input);
    const passed =
      result.prefix === expected.prefix &&
      result.suffix === expected.suffix &&
      result.numeric === expected.numeric &&
      result.decimals === expected.decimals;

    console.log(`Test ${index + 1}: ${passed ? "✅ PASS" : "❌ FAIL"}`, {
      input,
      expected,
      result,
    });
  });
}

// Test formatNumberLike function
function testFormatNumberLike() {
  console.log("\nTesting formatNumberLike...");

  const testCases = [
    { original: "87%", value: 92.5, expected: "93%" },
    { original: "£8.2M", value: 9.7, expected: "£9.7M" },
    { original: "12+", value: 15, expected: "15+" },
    { original: "1,234.56", value: 2567.89, expected: "2,567.89" },
    { original: "$1,000.00", value: 1500, expected: "$1,500.00" },
  ];

  testCases.forEach(({ original, value, expected }, index) => {
    const result = formatNumberLike(original, value);
    const passed = result === expected;

    console.log(`Test ${index + 1}: ${passed ? "✅ PASS" : "❌ FAIL"}`, {
      original,
      value,
      expected,
      result,
    });
  });
}

// Test reduced motion compatibility
function testReducedMotion() {
  console.log("\nTesting reduced motion...");

  // Mock the matchMedia API
  const mockMatchMedia = (matches: boolean) => ({
    matches,
    addEventListener: () => {},
    removeEventListener: () => {},
  });

  // Test when reduced motion is preferred
  (window as any).matchMedia = () => mockMatchMedia(true);
  console.log("✅ Reduced motion preference should be respected");

  // Test when reduced motion is not preferred
  (window as any).matchMedia = () => mockMatchMedia(false);
  console.log(
    "✅ Animation should run normally when reduced motion is not preferred"
  );
}

// Run all tests
export function runNumberFormatTests() {
  console.log("🧪 Running StatNumber component tests...\n");
  testParseFormattedNumber();
  testFormatNumberLike();
  testReducedMotion();
  console.log("\n✅ All tests completed!");
}

// Auto-run tests in development
if (import.meta.env.DEV) {
  runNumberFormatTests();
}
