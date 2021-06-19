const assert = require("assert");
const AssertionError = assert.AssertionError;

const describe = (message, callback) => {
  console.log(`\n🧪 describe > ${message}\n`);
  callback();
  console.log(`${"*".repeat(85)}`);
};

const test = (message, callback) => {
  console.log(`🔬 test > ${message}`);
  callback(); // WTFFFFF
};

const assertion = (message, callback) => {
  console.log(`💥 expect > ${message}`);
  try {
    callback();
    console.log(`\n💡 RESULT: PASSED ✅\n`);
  } catch (err) {
    console.log(`\n💡 RESULT: FAILED ❌\n🔴 ${err.message}`);
    assert(err instanceof AssertionError);
  }
};

const expect = (actual) => {
  return {
    toDeepStrictEqual: (expected) => {
      assertion("Expected values are strictly equal", () =>
        assert.deepStrictEqual(actual, expected)
      );
    },

    toBeType: (expectedType) => {
      assertion(`Expected type: ${expectedType}`, () =>
        assert.strictEqual(typeof actual, expectedType)
      );
    },

    toHaveLengthEqualTo: (expectedLength) => {
      assertion("Expected totals are strictly equal", () => {
        assert.strictEqual(actual.length, expectedLength);
      });
    },
  };
};

module.exports = { describe, test, expect };
