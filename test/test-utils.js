const assert = require("assert");
const AssertionError = assert.AssertionError;

const describe = (message, callback) => {
  console.log(`${"-".repeat(80)}`);
  console.log(`💭 describe > ${message}`);
  callback();
};

const it = (message, callback) => {
  console.log(`🧪 it > ${message}`);
  callback(); // WTFFFFFFFFFF
};

const expect = (actual) => {
  console.log(`🔔 expect > actual to match expected`);

  return {
    toDeepEqual: (expected) => {
      try {
        assert.deepStrictEqual(actual, expected);
        console.log(`✅ PASS: expect(actual).ToDeepStrictEqual(expected)`);
        // console.log(actual);
      } catch (err) {
        // console.log(err);
        console.log(`\n❌ FAIL: ${err.message}`);
        assert(err instanceof AssertionError);
      }
    },

    toHaveLengthEqualTo: (expected) => {
      try {
        assert.strictEqual(actual.length, expected.length);
        console.log(
          `✅ PASS: Results total actual: ${actual.length}, expected: ${expected.length}`
        );
      } catch (err) {
        // console.log(err);
        console.log(`\n❌ FAIL: ${err.message}`);
        console.log(
          `Results total actual: ${actual.length} but expected: ${expected.length}`
        );
        assert(err instanceof AssertionError);
      }
    },
  };
};

module.exports = { describe, it, expect };
