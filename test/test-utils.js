const assert = require("assert");
const AssertionError = assert.AssertionError;

const describe = (message, callback) => {
  console.log(`\n🧪 describe > ${message}\n`);
  callback();
  console.log(`${"=".repeat(100)}`);
};

const test = (message, callback) => {
  console.log(`🔬 test > ${message}`);
  callback();
};

const assertion = (expectMessage, passMessage, callback) => {
  console.log(`💥 expect > ${expectMessage}`);

  try {
    callback();
    console.log(`🟢 ${passMessage}\n✅ RESULT: PASSED\n`);
  } catch (err) {
    console.log(`🔴 ${err.message}\n❌ RESULT: FAILED\n`);
    assert(err instanceof AssertionError);
    process.exit();
  }
};

const validateType = (actual) => {
  if (Array.isArray(actual)) return "array";
  if (actual === null) return "null";
  return typeof actual;
};

const expect = (actual) => {
  return {
    toDeepStrictEqual: (expectedValue) => {
      assertion(
        "Expected is deep strict equal",
        "Actual deep strict equal to expected",
        () => assert.deepStrictEqual(actual, expectedValue)
      );
    },
    toBeType: (expectedType) => {
      assertion(
        `Expected type: ${expectedType}`,
        `Actual: ${typeof actual}, expected: ${expectedType}`,
        () => assert.strictEqual(validateType(actual), expectedType)
      );
    },
    toHaveLengthEqualTo: (expectedLength) => {
      assertion(
        "Expected totals are strictly equal",
        `Actual: ${actual.length}, expected: ${expectedLength}`,
        () => {
          assert.strictEqual(actual.length, expectedLength);
        }
      );
    },
  };
};

module.exports = { describe, test, expect };
