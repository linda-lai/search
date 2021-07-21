const { search } = require("../src/search");
const { loadDatasets } = require("../src/data");
const { describe, test, expect } = require("./test-utils");

const { mockOrganization, mockUsers } = require("./data");

const runSearchTests = () => {
  console.log(`${"=".repeat(100)}\n${"=".repeat(100)}\n`);
  console.log(`RUNNING TESTS FOR: ${__filename}`);
  console.log(`\n${"=".repeat(100)}\n${"=".repeat(100)}`);

  describe("search organizations entity for field with boolean value", () => {
    const query = {
      entityName: "organizations",
      field: "shared_tickets",
      value: false,
    };

    const actual = results(query);

    test("finds 15 matching records", () => {
      expect(actual).toHaveLengthEqualTo(15);
    });
  });

  describe("search organizations entity for field with integer value", () => {
    const query = {
      entityName: "organizations",
      field: "_id",
      value: 101,
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toDeepStrictEqual(mockOrganization);
    });
    test("finds 1 matching record", () => {
      expect(actual).toHaveLengthEqualTo(mockOrganization.length);
    });
    test("returns an object", () => {
      expect(actual[0]).toBeType(typeof mockOrganization);
    });
  });

  describe("search organizations entity for field with string value", () => {
    const query = {
      entityName: "organizations",
      field: "name",
      value: "Enthaze",
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toDeepStrictEqual(mockOrganization);
    });
    test("finds 1 matching record", () => {
      expect(actual).toHaveLengthEqualTo(mockOrganization.length);
    });
  });

  describe("search users entity for field with boolean value", () => {
    const query = {
      entityName: "users",
      field: "shared",
      value: false,
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(47);
    });
  });

  describe("search tickets entity when related record's assignee_id doesn't exist", () => {
    const query = {
      entityName: "tickets",
      field: "_id",
      value: "17951590-6a78-49e8-8e45-1d4326ba49cc",
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(1);
    });
  });

  describe("search organizations entity when query value is in array", () => {
    const query = {
      entityName: "organizations",
      field: "tags",
      value: "Hendricks",
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(1);
      expect(actual[0].attributes._id).toDeepStrictEqual(104);
    });
  });

  describe("search tickets entity for description when field is missing or value is null", () => {
    const query = {
      entityName: "tickets",
      field: "description",
      value: null,
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(2);
      expect(actual[0].attributes._id).toDeepStrictEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });
  });

  describe(`search entity for subject when field exists but value is empty string ""`, () => {
    const query = {
      entityName: "tickets",
      field: "subject",
      value: "",
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(1);
      expect(actual[0].attributes._id).toDeepStrictEqual(
        "62a4326f-7114-499f-9adc-a14e99a7ffb4"
      );
      expect(actual).toBeType("array");
    });
  });
};

const results = ({ entityName, field, value }) =>
  search(entityName, field, value, loadDatasets());

const message = (query) =>
  `query | entity: ${query.entityName} | field: ${query.field} | value: ${
    query.value
  } (${typeof query.value})`;

module.exports = { runSearchTests };
