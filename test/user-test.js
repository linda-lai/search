const fs = require("fs");
const path = require("path");

const User = require("../src/user");
const {
  printTestFileHeader,
  validateRelatedRecordIncludes,
  countEntityInstances,
  relatedRecordsInstances,
  describe,
  test,
  expect,
} = require("./utils/helpers");

const data = require("./data/related-entities");

const runUserTests = () => {
  printTestFileHeader(path.basename(__filename));

  const user = new User(
    JSON.parse(fs.readFileSync(__dirname + "/data/user.json"))
  );

  describe("User method match() looks up query value using query field", () => {
    test("query value: Oceola exists in attribute value for the field: tags", () => {
      const queryField = "tags";
      const queryValue = "Oceola";
      expect(user.match(queryField, queryValue)).toEqual(true);
    });

    test("query value: false is strictly equal with attribute value for query field: suspended", () => {
      expect(user.match("suspended", false)).toEqual(true);
    });

    test(`query value: "false" isn't strictly equal with attribute value for query field: suspended`, () => {
      expect(user.match("suspended", "false")).toEqual(false);
    });
  });

  describe(`User method getRelatedEntities() returns related organization and ticket records`, () => {
    const actual = user.getRelatedRecords(data);

    test(`IDs of related entities for user record with _id: 59`, () => {
      const actualRelatedRecordIDs = actual.map(
        (record) => record.attributes._id
      );
      const expectedRelatedRecordIDs = [
        118,
        "7c67b6ed-6776-4065-bd4a-f2d9d12c33b7",
        "59d803f6-a9cd-448c-a6bd-91ce9f044305",
        "25cb699f-a5dd-45d8-9bc1-9c4b7d096946",
      ];
      expect(
        validateRelatedRecordIncludes(
          actualRelatedRecordIDs,
          expectedRelatedRecordIDs
        )
      ).toEqual(true);

      test("returns 4 records", () => {
        expect(actual).toHaveLength(4);
      });
    });

    test(`getRelatedRecords() for user record with _id: 59 contains only 1 organization`, () => {
      const organizationInstances = countEntityInstances(
        "Organization",
        relatedRecordsInstances(actual)
      );
      expect(organizationInstances).toEqual(1);
    });

    test(`getRelatedRecords() for user record with _id: 59 returns 3 tickets`, () => {
      const ticketInstances = countEntityInstances(
        "Ticket",
        relatedRecordsInstances(actual)
      );
      expect(ticketInstances).toEqual(3);
    });
  });
};

module.exports = runUserTests;
