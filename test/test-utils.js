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

const expect = (actual) => {
  return {
    toDeepStrictEqual: (expected) => {
      try {
        assert.deepStrictEqual(actual, expected);
        console.log(`🔔 expect > expect(actual).ToDeepStrictEqual(expected)`);
        console.log(
          `✅ RESULT: PASSED\n🟢 Expected values are strictly equal\n`
        );
        // console.log(actual);
      } catch (err) {
        // console.log(err);
        console.log(`\n❌ RESULT: FAILED\n🔴 ${err.message}`);
        assert(err instanceof AssertionError);
      }
    },

    toBeTypeOf: (expected) => {
      try {
        assert.strictEqual(typeof actual, typeof expected);
        console.log(
          `🔔 expect > expect(actual).toBeTypeOf(${typeof expected})`
        );
        console.log(
          `✅ RESULT: PASSED\n🟢 Expected type of ${typeof actual}\n`
        );
      } catch (err) {
        // console.log(err);
        console.log(`\n❌ RESULT: FAILED\n🔴 ${err.message}`);
        assert(err instanceof AssertionError);
      }
    },

    toHaveLengthEqualTo: (expected) => {
      try {
        assert.strictEqual(actual.length, expected.length);
        console.log(
          `🔔 expect > expect(actual).toHaveLengthEqualTo(${expected.length})`
        );
        console.log(
          `✅ RESULT: PASSED\n🟢 Expected number of results are strictly equal\n`
        );
      } catch (err) {
        // console.log(err);
        console.log(`\n❌ RESULT: FAILED\n🔴 ${err.message}`);
        assert(err instanceof AssertionError);
      }
    },
  };
};

module.exports = { describe, it, expect };
