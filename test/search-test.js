const path = require("path");

const {
  printTestFileHeader,
  describe,
  test,
  expect,
} = require("./utils/helpers");

const { search } = require("../src/search");
const { loadDatasets } = require("../src/data");
const { testOrganization, testUser, testTicket } = require("./data/entities");
// const relatedData = require("./data/related-entities");

/*
  1. string ✅
  2. number ✅
  3. boolean ✅
  4. null
  5. undefined
  6. empty string
  7. date
  8. no results
  9. value in array
  10. special character
  11. case sensitivity?
*/

const runSearchTests = () => {
  printTestFileHeader(path.basename(__filename));

  describe("search() users for field with string value", () => {
    const query = {
      entityName: "users",
      field: "alias",
      value: "Mr Lucile",
    };

    const actual = searchResults(query);

    test(`${format(query)} returns exact matching records`, () => {
      expect(actual).toEqual(testUser);
    });

    test("returns a collection of type array", () => {
      expect(actual).toBeType("array");
    });

    test("returns a collection of objects", () => {
      expect(actual[0]).toBeType("object");
    });

    test("finds 1 matching record", () => {
      expect(actual).toHaveLength(1);
    });

    test("returns matching record with _id: 59", () => {
      expect(actual[0].attributes._id).toEqual(59);
    });
  });

  describe("search() users for field with integer value", () => {
    const query = {
      entityName: "users",
      field: "_id",
      value: 59,
    };

    const actual = searchResults(query);

    test(`${format(query)} returns exact matching records`, () => {
      expect(actual).toEqual(testUser);
    });

    test("finds 1 matching record", () => {
      expect(actual).toHaveLength(testUser.length);
    });
  });

  describe("search() users for field with boolean value", () => {
    const query = {
      entityName: "users",
      field: "suspended",
      value: false,
    };

    const actual = searchResults(query);

    test(`${format(query)} first matching record has _id: 2`, () => {
      expect(actual[0].attributes._id).toEqual(2);
    });

    test("finds 39 matching records", () => {
      expect(actual).toHaveLength(39);
    });
  });

  describe("search() organizations for field with date string value", () => {
    const query = {
      entityName: "organizations",
      field: "created_at",
      value: "2016-05-24T04:27:35 -10:00",
    };

    const actual = searchResults(query);

    test(`${format(query)} matching organization name: Isotronic`, () => {
      expect(actual[0].attributes.name).toEqual("Isotronic");
    });

    test(format(query), () => {
      expect(actual).toHaveLength(1);
    });
  });

  describe("search() organizations for field with string value containing special characters", () => {
    const query = {
      entityName: "organizations",
      field: "details",
      value: "Artisân",
    };

    const actual = searchResults(query);

    test(`${format(query)} finds 2 matching records`, () => {
      expect(actual).toHaveLength(2);
    });
  });

  describe("search() tickets entity when related record's assignee_id doesn't exist", () => {
    const query = {
      entityName: "tickets",
      field: "_id",
      value: "17951590-6a78-49e8-8e45-1d4326ba49cc",
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toHaveLength(1);
    });
  });

  describe("search() organizations entity when query value is in array", () => {
    const query = {
      entityName: "organizations",
      field: "tags",
      value: "Hendricks",
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toHaveLength(1);
      expect(actual[0].attributes._id).toEqual(104);
    });
  });

  describe("search() tickets for description when field is missing or value is null", () => {
    const query = {
      entityName: "tickets",
      field: "description",
      value: null,
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toHaveLength(2);
      expect(actual[0].attributes._id).toEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });
  });

  describe(`search() for subject when field exists but value is empty string ""`, () => {
    const query = {
      entityName: "tickets",
      field: "subject",
      value: "",
    };

    const actual = searchResults(query);

    test(format(query), () => {
      expect(actual).toHaveLength(1);
      expect(actual[0].attributes._id).toEqual(
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
