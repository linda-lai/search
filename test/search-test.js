const path = require("path");

const {
  printTestFileHeader,
  describe,
  test,
  expect,
} = require("./utils/helpers");

const { search } = require("../src/search");
const { loadDatasets } = require("../src/data");
const {
  testOrganization,
  // testUser,
  // testTicket
} = require("./data/entities");
// const relatedData = require("./data/related-entities");

const runSearchTests = () => {
  printTestFileHeader(path.basename(__filename));

  describe("search() organizations for field with boolean value", () => {
    const query = {
      entityName: "organizations",
      field: "shared_tickets",
      value: false,
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual[0].attributes._id).toDeepStrictEqual(101);
    });

    test("finds 15 matching records", () => {
      expect(actual).toHaveLengthEqualTo(15);
    });
  });

  describe("search organizations for field with integer value", () => {
    const query = {
      entityName: "organizations",
      field: "_id",
      value: 114,
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toDeepStrictEqual(testOrganization);
    });
    test("finds 1 matching record", () => {
      expect(actual).toHaveLengthEqualTo(testOrganization.length);
    });
    test("returns an object", () => {
      expect(actual[0]).toBeType(typeof testOrganization);
    });
  });

  describe("search organizations for field with string value", () => {
    const query = {
      entityName: "organizations",
      field: "name",
      value: "Isotronic",
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toDeepStrictEqual(testOrganization);
    });
    test("finds 1 matching record", () => {
      expect(actual).toHaveLengthEqualTo(testOrganization.length);
    });
  });

  describe("search users for field with boolean value", () => {
    const query = {
      entityName: "users",
      field: "shared",
      value: false,
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toHaveLengthEqualTo(47);
    });
  });

  describe("search tickets entity when related record's assignee_id doesn't exist", () => {
    const query = {
      entityName: "tickets",
      field: "_id",
      value: "17951590-6a78-49e8-8e45-1d4326ba49cc",
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toHaveLengthEqualTo(1);
    });
  });

  describe("search organizations entity when query value is in array", () => {
    const query = {
      entityName: "organizations",
      field: "tags",
      value: "Hendricks",
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toHaveLengthEqualTo(1);
      expect(actual[0].attributes._id).toDeepStrictEqual(104);
    });
  });

  describe("search tickets for description when field is missing or value is null", () => {
    const query = {
      entityName: "tickets",
      field: "description",
      value: null,
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toHaveLengthEqualTo(2);
      expect(actual[0].attributes._id).toDeepStrictEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });
  });

  describe(`search for subject when field exists but value is empty string ""`, () => {
    const query = {
      entityName: "tickets",
      field: "subject",
      value: "",
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toHaveLengthEqualTo(1);
      expect(actual[0].attributes._id).toDeepStrictEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
      expect(actual).toBeType("array");
    });
  });
};

const searchResults = ({ entityName, field, value }) =>
  search(entityName, field, value, loadDatasets());

const format = (query) =>
  `entity: ${query.entityName} / field: ${query.field} / value: ${query.value}`;

module.exports = { runSearchTests };
