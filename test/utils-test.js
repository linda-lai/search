const path = require("path");

const { match } = require("../src/utils");
const {
  printTestFileHeader,
  describe,
  test,
  expect,
} = require("./utils/helpers");

const runUtilsTests = () => {
  printTestFileHeader(path.basename(__filename));

  describe("match() util evaluates an attribute value and query value against match criteria", () => {
    const attributeValue = [
      "Massachusetts",
      "New York",
      "Minnesota",
      "New Jersey",
    ];
    test("query value matches attribute value in array", () => {
      const queryValue = "New York";

      const result = match(attributeValue, queryValue);
      expect(result).toEqual(true);
    });

    test("string isn't an exact match", () => {
      const queryValue = "New";

      const result = match(attributeValue, queryValue);
      expect(result).toEqual(false);
    });

    test("query value is null and attribute is undefined", () => {
      const attributeValue = undefined;
      const queryValue = null;

      const result = match(attributeValue, queryValue);
      expect(result).toEqual(true);
    });

    test("query value is strictly equal to attribute value", () => {
      const attributeValue = 1;
      const queryValue = 1;

      const result = match(attributeValue, queryValue);
      expect(result).toEqual(true);
    });

    test("query value isn't strictly equal to attribute value", () => {
      const attributeValue = 1;
      const queryValue = "1";

      const result = match(attributeValue, queryValue);
      expect(result).toEqual(false);
    });
  });
};

module.exports = runUtilsTests;
