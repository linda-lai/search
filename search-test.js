const { search } = require("./search");
const { loadDatasets } = require("./data");
const { describe, test, expect } = require("./test/test-utils");

const { mockOrganization, mockUsers } = require("./test/data/results");

const runSearchTests = () => {
  console.log(`${"=".repeat(90)}\n${"=".repeat(90)}\n`);
  console.log(`RUNNING TESTS FOR: ${__filename}`);
  console.log(`\n${"=".repeat(90)}\n${"=".repeat(90)}`);

  describe("search organizations entity with integer value", () => {
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
  });

  describe("search organizations entity with string value", () => {
    const query = {
      entityName: "organizations",
      field: "_id",
      value: "101",
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toDeepStrictEqual(mockOrganization);
    });
    test("finds 1 matching record", () => {
      expect(actual).toHaveLengthEqualTo(mockOrganization.length);
    });
    test("returns an object", () => {
      expect(actual).toBeType(typeof mockOrganization);
    });
  });

  describe("search organizations entity with string value", () => {
    const query = {
      entityName: "organizations",
      field: "name",
      value: '"Enthaze"', // string must be wrapped in single quotes
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toDeepStrictEqual(mockOrganization);
    });
    test("finds 1 matching record", () => {
      expect(actual).toHaveLengthEqualTo(mockOrganization.length);
    });
  });

  describe("search users entity with integer value", () => {
    const query = {
      entityName: "users",
      field: "organization_id",
      value: 118,
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toDeepStrictEqual(mockUsers);
    });
    test("finds 2 matching records", () => {
      expect(actual).toHaveLengthEqualTo(mockUsers.length);
    });
  });

  describe("search users entity with integer value", () => {
    const query = {
      entityName: "users",
      field: "shared",
      value: "false",
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(47);
    });
  });

  describe("search tickets entity with integer value", () => {
    const query = {
      entityName: "tickets",
      field: "organization_id",
      value: 112,
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(5);
    });
  });

  describe("search tickets entity when related record's ID doesn't exist", () => {
    const query = {
      entityName: "tickets",
      field: "_id",
      value: '"17951590-6a78-49e8-8e45-1d4326ba49cc"',
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(1);
    });
  });

  describe("search tickets entity when subject field is missing", () => {
    const query = {
      entityName: "tickets",
      field: "subject",
      value: "null",
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(1);
      expect(actual[0].attributes._id).toDeepStrictEqual(
        "2614576f-98fb-4031-9e13-beca7a6a73ee"
      );
    });
  });
};

const results = ({ entityName, field, value }) =>
  search(entityName, field, value, loadDatasets());

const message = (query) =>
  `query for ENTITY: ${query.entityName} > FIELD: ${query.field} > VALUE: ${
    query.value
  } (${typeof query.value})`;

module.exports = { runSearchTests };
