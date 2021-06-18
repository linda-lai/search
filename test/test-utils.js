const assert = require("assert");
const AssertionError = assert.AssertionError;

//https://nodejs.org/api/assert.html#assert_assert

const describe = (message, callback) => {
  console.log(`${"-".repeat(70)}`);
  console.log(`💭 describe > ${message}`);
  callback();
};

const it = (message, callback) => {
  console.log(`${"-".repeat(5)} 🧪 it  > ${message}`);
  callback(); // WTFFFFFFFFFF
};

const expect = (actual) => {
  console.log(`${"-".repeat(10)} 🔔 expect > actual to match expected`);

  return {
    toDeepEqual: (expected) => {
      try {
        assert.deepStrictEqual(actual, expected);
        console.log(`✅ PASS: expect(actual).ToDeepStrictEqual(expected) 👇`);
        console.log(actual);
      } catch (err) {
        // console.log(err);
        console.log(`\n❌ FAIL: ${err.message}`);
        assert(err instanceof AssertionError);
      }
    },
  };
};

module.exports = { describe, it, expect };
