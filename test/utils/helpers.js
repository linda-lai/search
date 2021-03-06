const assert = require("assert");
const AssertionError = assert.AssertionError;

const { border, padding } = require("../../src/utils");

const printTestFileHeader = (filename) => {
  console.log(
    `\n${border("=", 130)}\nRUNNING TESTS FOR: ${filename}\n${border("=", 130)}`
  );
};

const validateResultsInclude = (actual, expected) =>
  actual.every((attributeValue) => expected.includes(attributeValue));

const getResultIDs = (results) =>
  results.map((record) => record.attributes._id);

const getResultInstances = (results) =>
  results.map((record) => record.constructor.name);

const countResultInstances = (entityName, instances) => {
  return instances.filter((instance) => instance === entityName).length;
};

const validateType = (actual) => {
  if (Array.isArray(actual)) return "array";
  if (actual === null) return "null";
  return typeof actual;
};

const describe = (message, callback) => {
  console.log(`\n๐งช describe > ${message}\n`);
  callback();
  console.log(`${border("โ", 130)}`);
};

const test = (message, callback) => {
  console.log(`${padding(2)}๐ฌ test > ${message}`);
  callback();
};

const assertion = (expectMessage, passMessage, callback) => {
  console.log(`${padding(4)}๐ฅ expect > ${expectMessage}`);
  try {
    callback();
    console.log(
      `${padding(4)}๐ข ${passMessage}\n${padding(4)}โ RESULT: PASSED\n`
    );
  } catch (err) {
    `๐ด ${err.message}`
      .split("\n")
      .map((line) => console.log(`${padding(4)}${line}`));
    console.log(`\n${padding(4)}โ RESULT: FAILED\n`);
    assert(err instanceof AssertionError);
    process.exit();
  }
};

const expect = (actual) => {
  return {
    toEqual: (expectedValue) => {
      assertion(
        `Expected is deep strict equal`,
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
    toHaveLength: (expectedLength) => {
      assertion(
        `Expected length: ${expectedLength} is strictly equal`,
        `Actual: ${actual.length}, expected: ${expectedLength}`,
        () => {
          assert.strictEqual(actual.length, expectedLength);
        }
      );
    },
  };
};

module.exports = {
  printTestFileHeader,
  validateResultsInclude,
  getResultIDs,
  getResultInstances,
  countResultInstances,
  describe,
  test,
  expect,
};
