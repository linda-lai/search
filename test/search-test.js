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

    test(`${format(query)} matches name: Isotronic`, () => {
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

  describe("search() organizations for field with string value contained in an array", () => {
    const query = {
      entityName: "organizations",
      field: "tags",
      value: "Maddox",
    };

    const actual = searchResults(query);

    test(`${format(query)} returns exact match`, () => {
      expect(actual).toEqual(testOrganization);
      expect(actual).toHaveLength(1);
    });
  });

  describe(`search() tickets for field when string value is empty ("")`, () => {
    const query = {
      entityName: "tickets",
      field: "subject",
      value: "",
    };

    const actual = searchResults(query);

    test(`${format(query)} returns exact match`, () => {
      expect(actual).toEqual(testTicket);
    });

    test(`matches record with _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b`, () => {
      expect(actual[0].attributes._id).toEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });

    test("finds 1 matching record", () => {
      expect(actual).toHaveLength(1);
    });
  });

  describe(`search() tickets for field when string value is empty ("")`, () => {
    const query = {
      entityName: "tickets",
      field: "subject",
      value: "",
    };

    const actual = searchResults(query);

    test(`${format(
      query
    )} matches record with _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b`, () => {
      expect(actual[0].attributes._id).toEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });

    test("finds 1 matching record", () => {
      expect(actual).toHaveLength(1);
    });
  });

  describe(`search() tickets for field when value is null`, () => {
    const query = {
      entityName: "tickets",
      field: "description",
      value: null,
    };

    const actual = searchResults(query);

    test(`${format(
      query
    )} matches record with _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b`, () => {
      expect(actual[0].attributes._id).toEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });

    test("finds 1 matching record", () => {
      expect(actual).toHaveLength(1);
    });
  });

  describe(`search() tickets for undefined field using null`, () => {
    const query = {
      entityName: "tickets",
      field: "assignee_id",
      value: null,
    };

    const actual = searchResults(query);

    test(`${format(
      query
    )} first matching record has _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b`, () => {
      expect(actual[0].attributes._id).toEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });

    test("finds 5 matching records with undefined assignee_id", () => {
      expect(actual).toHaveLength(5);
    });
  });

  describe(`search() tickets for existing field with no matching value`, () => {
    const query = {
      entityName: "tickets",
      field: "status",
      value: "foobar",
    };

    const actual = searchResults(query);

    test(`${format(query)} returns no matches`, () => {
      expect(actual).toHaveLength(0);
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
};

const searchResults = ({ entityName, field, value }) =>
  search(entityName, field, value, loadDatasets());

const format = ({ entityName, field, value }) =>
  `entity: ${entityName} / field: ${field} / value: ${value}`;

module.exports = { runSearchTests };
