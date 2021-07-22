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

    const userResults = searchResults(query);

    test(`${format(query)} returns exact matching records`, () => {
      expect(userResults).toEqual(testUser);
    });

    test("returns a collection of type array", () => {
      expect(userResults).toBeType("array");
    });

    test("returns a collection of objects", () => {
      expect(userResults[0]).toBeType("object");
    });

    test("finds 1 matching record", () => {
      expect(userResults).toHaveLength(1);
    });

    test("returns matching record with _id: 59", () => {
      expect(userResults[0].attributes._id).toEqual(59);
    });
  });

  describe("search() users for field with integer value", () => {
    const query = {
      entityName: "users",
      field: "_id",
      value: 59,
    };

    const userResults = searchResults(query);

    test(`${format(query)} returns exact matching records`, () => {
      expect(userResults).toEqual(testUser);
    });

    test("finds 1 matching record", () => {
      expect(userResults).toHaveLength(testUser.length);
    });
  });

  describe("search() users for field with boolean value", () => {
    const query = {
      entityName: "users",
      field: "suspended",
      value: false,
    };

    const userResults = searchResults(query);

    test(`${format(query)} first matching record has _id: 2`, () => {
      expect(userResults[0].attributes._id).toEqual(2);
    });

    test("finds 39 matching records", () => {
      expect(userResults).toHaveLength(39);
    });
  });

  describe("search() organizations for field with date string value", () => {
    const query = {
      entityName: "organizations",
      field: "created_at",
      value: "2016-05-24T04:27:35 -10:00",
    };

    const organizationResults = searchResults(query);

    test(`${format(query)} matches name: Isotronic`, () => {
      expect(organizationResults[0].attributes.name).toEqual("Isotronic");
    });

    test(format(query), () => {
      expect(organizationResults).toHaveLength(1);
    });
  });

  describe("search() organizations for field with string value containing special characters", () => {
    const query = {
      entityName: "organizations",
      field: "details",
      value: "Artisân",
    };

    const organizationResults = searchResults(query);

    test(`${format(query)} finds 2 matching records`, () => {
      expect(organizationResults).toHaveLength(2);
    });
  });

  describe("search() organizations for field with string value contained in an array", () => {
    const query = {
      entityName: "organizations",
      field: "tags",
      value: "Maddox",
    };

    const organizationResults = searchResults(query);

    test(`${format(query)} returns exact match`, () => {
      expect(organizationResults).toEqual(testOrganization);
      expect(organizationResults).toHaveLength(1);
    });
  });

  describe(`search() tickets for field when string value is empty ("")`, () => {
    const query = {
      entityName: "tickets",
      field: "subject",
      value: "",
    };

    const ticketResults = searchResults(query);

    test(`${format(query)} returns exact match`, () => {
      expect(ticketResults).toEqual(testTicket);
    });

    test(`matches record with _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b`, () => {
      expect(ticketResults[0].attributes._id).toEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });

    test("finds 1 matching record", () => {
      expect(ticketResults).toHaveLength(1);
    });
  });

  describe(`search() tickets for field when string value is empty ("")`, () => {
    const query = {
      entityName: "tickets",
      field: "subject",
      value: "",
    };

    const ticketResults = searchResults(query);

    test(`${format(
      query
    )} matches record with _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b`, () => {
      expect(ticketResults[0].attributes._id).toEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });

    test("finds 1 matching record", () => {
      expect(ticketResults).toHaveLength(1);
    });
  });

  describe(`search() tickets for field when value is null`, () => {
    const query = {
      entityName: "tickets",
      field: "description",
      value: null,
    };

    const ticketResults = searchResults(query);

    test(`${format(
      query
    )} matches record with _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b`, () => {
      expect(ticketResults[0].attributes._id).toEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });

    test("finds 1 matching record", () => {
      expect(ticketResults).toHaveLength(1);
    });
  });

  describe(`search() tickets for undefined field using null`, () => {
    const query = {
      entityName: "tickets",
      field: "assignee_id",
      value: null,
    };

    const ticketResults = searchResults(query);

    test(`${format(
      query
    )} first matching record has _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b`, () => {
      expect(ticketResults[0].attributes._id).toEqual(
        "436bf9b0-1147-4c0a-8439-6f79833bff5b"
      );
    });

    test("finds 5 matching records with undefined assignee_id", () => {
      expect(ticketResults).toHaveLength(5);
    });
  });

  describe(`search() tickets for existing field with no matching value`, () => {
    const query = {
      entityName: "tickets",
      field: "status",
      value: "foobar",
    };

    const ticketResults = searchResults(query);

    test(`${format(query)} returns no matches`, () => {
      expect(ticketResults).toHaveLength(0);
    });
  });

  describe("search() organizations entity when query value is in array", () => {
    const query = {
      entityName: "organizations",
      field: "tags",
      value: "Hendricks",
    };

    const organizationResults = searchResults(query);

    test(format(query), () => {
      expect(organizationResults).toHaveLength(1);
      expect(organizationResults[0].attributes._id).toEqual(104);
    });
  });
};

const searchResults = ({ entityName, field, value }) =>
  search(entityName, field, value, loadDatasets());

const format = ({ entityName, field, value }) =>
  `entity: ${entityName} / field: ${field} / value: ${value}`;

module.exports = runSearchTests;
