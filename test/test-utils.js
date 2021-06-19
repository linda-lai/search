const assert = require("assert");
const AssertionError = assert.AssertionError;

const describe = (message, callback) => {
  console.log(`💥 describe > ${message}\n`);
  callback();
};

const it = (message, callback) => {
  console.log(`🧪 it > ${message}`);
  callback(); // WTFFFFFFFFFF
};

const assertion = (message, callback) => {
  console.log(`🔔 expect > ${message}`);
  try {
    callback();
    console.log(`✅ RESULT: PASSED\n`);
  } catch (err) {
    console.log(`\n❌ RESULT: FAILED\n🔴 ${err.message}`);
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

    toBeTypeOf: (expected) => {
      assertion(`Expected type of ${typeof actual}\n`, () =>
        assert.strictEqual(typeof actual, typeof expected)
      );
    },

    toHaveLengthEqualTo: (expected) => {
      assertion("Expected number of results are strictly equal\n", () => {
        assert.strictEqual(actual.length, expected.length);
      });
    },
  };
};

module.exports = { describe, it, expect };
