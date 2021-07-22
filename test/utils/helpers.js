const assert = require("assert");
const AssertionError = assert.AssertionError;

const { border, padding } = require("../../src/utils");

const printTestFileHeader = (filename) => {
  console.log(
    `\n${border("=", 100)}\nRUNNING TESTS FOR: ${filename}\n${border("=", 100)}`
  );
};

const describe = (message, callback) => {
  console.log(`\n🧪 describe > ${message}\n`);
  callback();
  console.log(`${border("—", 100)}`);
};

const test = (message, callback) => {
  console.log(`${padding(2)}🔬 test > ${message}`);
  callback();
};

const assertion = (expectMessage, passMessage, callback) => {
  console.log(`${padding(4)}💥 expect > ${expectMessage}`);
  try {
    callback();
    console.log(
      `${padding(4)}🟢 ${passMessage}\n${padding(4)}✅ RESULT: PASSED\n`
    );
  } catch (err) {
    console.log(
      `${padding(4)}🔴 ${err.message}\n${padding(4)}❌ RESULT: FAILED\n`
    );
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

module.exports = { printTestFileHeader, describe, test, expect };
