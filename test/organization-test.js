const fs = require("fs");
const path = require("path");

const Organization = require("../src/organization");
const {
  printTestFileHeader,
  describe,
  test,
  expect,
} = require("./utils/helpers");

const data = require("./data/related-entities");

const runOrganizationTests = () => {
  printTestFileHeader(path.basename(__filename));

  const organization = new Organization(
    JSON.parse(fs.readFileSync(__dirname + "/data/organization.json"))
  );

  describe("Organization method match() looks up query value using query field", () => {
    test("returns true when query value is found in record", () => {
      const queryField = "name";
      const queryValue = "Isotronic";
      const actual = organization.match(queryField, queryValue);
      expect(actual).toEqual(true);
    });

    test("returns false when query value doesn't in record", () => {
      const queryField = "_id";
      const queryValue = 13;
      const actual = organization.match(queryField, queryValue);
      expect(actual).toEqual(false);
    });
  });

  describe("Organization method getRelatedEntities() returns ticket and user records containing organization_id", () => {
    test("IDs of related entities returned for organization record with _id: 114", () => {
      const actual = organization.getRelatedRecords(data);
      const actualRelatedRecordIDs = actual.map(
        (record) => record.attributes._id
      );
      const expectedRelatedRecordIDs = [
        "bc736a06-eeb0-4271-b4a8-c66f61b5df1f",
        38,
        61,
        74,
      ];

      expect(
        actualRelatedRecordIDs.every((id) =>
          expectedRelatedRecordIDs.includes(id)
        )
      ).toEqual(true);

      expect(actual).toHaveLength(4);
    });
  });
};

module.exports = { runOrganizationTests };
