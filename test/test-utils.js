const assert = require("assert"); //https://nodejs.org/api/assert.html#assert_assert

const describe = (message, callback) => {
  console.log(`${"-".repeat(100)}`);
  console.log(`${"-".repeat(10)} 💭 describe > ${message}`);
  callback();
};

const it = (message, callback) => {
  console.log(`${"-".repeat(10)} 🧪 it  > ${message}`);
  callback(); // WTFFFFFFFFFF
};

const expect = (actual) => {
  console.log(
    `${"-".repeat(
      10
    )} 🔔 expect > expect(actual).toDeepEqual(expected)\n${"-".repeat(
      10
    )} 👇 to match`
  );

  return {
    toDeepEqual: (expected) => {
      assertionError = assert.deepStrictEqual(actual, expected);
      // console.log(actual);
      // console.log(expected);

      if (!assertionError) {
        console.log(`${"-".repeat(10)} ✅ PASS`);
        console.log(actual);
      } else {
      }
      return assertionError;
    },
  };
};

module.exports = { describe, it, expect };
