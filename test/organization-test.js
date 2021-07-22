const fs = require("fs");
const path = require("path");

const Organization = require("../src/organization");
const {
  printTestFileHeader,
  getResultIDs,
  validateResultsInclude,
  countResultInstances,
  getResultInstances,
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
    test("query value: Isotronic matches attribute value for field: name", () => {
      const queryField = "name";
      const queryValue = "Isotronic";
      expect(organization.match(queryField, queryValue)).toEqual(true);
    });

    test("returns false when query value doesn't exist in record", () => {
      expect(organization.match("_id", 13)).toEqual(false);
    });
  });

  describe("Organization method getRelatedEntities() returns related ticket and user records", () => {
    const organizationRelatedRecords = organization.getRelatedRecords(data);
    test("IDs of related entities for organization record with _id: 114", () => {
      const organizationRelatedRecordIDs = getResultIDs(
        organizationRelatedRecords
      );
      const expectedRelatedRecordIDs = [
        "bc736a06-eeb0-4271-b4a8-c66f61b5df1f",
        38,
        61,
        74,
      ];

      expect(
        validateResultsInclude(
          organizationRelatedRecordIDs,
          expectedRelatedRecordIDs
        )
      ).toEqual(true);

      test("returns 4 records", () => {
        expect(organizationRelatedRecords).toHaveLength(4);
      });
    });

    test(`getRelatedRecords() for for organization record with _id: 114 can return multiple tickets`, () => {
      const ticketInstances = countResultInstances(
        "Ticket",
        getResultInstances(organizationRelatedRecords)
      );
      expect(ticketInstances).toEqual(1);
    });

    test(`getRelatedRecords() for for organization record with _id: 114 can return multiple users`, () => {
      const userInstances = countResultInstances(
        "User",
        getResultInstances(organizationRelatedRecords)
      );
      expect(userInstances).toEqual(3);
    });
  });
};

module.exports = runOrganizationTests;
