const fs = require("fs");
const path = require("path");

const Ticket = require("../src/ticket");
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

const runTicketTests = () => {
  printTestFileHeader(path.basename(__filename));

  const ticket = new Ticket(
    JSON.parse(fs.readFileSync(__dirname + "/data/ticket.json"))
  );

  describe("Ticket method match() looks up query value using query field", () => {
    test("query value: Ohio exists in attribute value for the field: tags", () => {
      const queryField = "tags";
      const queryValue = "Ohio";
      expect(ticket.match(queryField, queryValue)).toEqual(true);
    });

    test("query value: 38 is strictly equal with attribute value for query field: submitter_id", () => {
      expect(ticket.match("submitter_id", 38)).toEqual(true);
    });

    test(`query value: "38" isn't strictly equal with attribute value for query field: submitter_id`, () => {
      expect(ticket.match("submitter_id", "38")).toEqual(false);
    });

    test("query field: description is defined and query value is null", () => {
      expect(ticket.match("description", null)).toEqual(true);
    });

    test("query field: assignee_id is undefined and query value is null", () => {
      expect(ticket.match("assignee_id", null)).toEqual(true);
    });

    test("query field: subject exists and query value is empty string", () => {
      expect(ticket.match("subject", "")).toEqual(true);
    });
  });

  describe("Ticket method getRelatedEntities() returns related user and organization records", () => {
    const ticketRelatedRecords = ticket.getRelatedRecords(data);

    test("IDs of related entities for ticket record with _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b", () => {
      const ticketRelatedRecordIDs = getResultIDs(ticketRelatedRecords);
      const expectedRelatedRecordIDs = [38, 116];
      expect(
        validateResultsInclude(ticketRelatedRecordIDs, expectedRelatedRecordIDs)
      ).toEqual(true);

      test("returns 2 records", () => {
        expect(ticketRelatedRecords).toHaveLength(2);
      });
    });

    test(`getRelatedRecords() for ticket record with _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b contains only 1 organization`, () => {
      const organizationInstances = countResultInstances(
        "Organization",
        getResultInstances(ticketRelatedRecords)
      );
      expect(organizationInstances).toEqual(1);
    });

    test(`getRelatedRecords() for ticket record with _id: 436bf9b0-1147-4c0a-8439-6f79833bff5b returns 1 user`, () => {
      const userInstances = countResultInstances(
        "User",
        getResultInstances(ticketRelatedRecords)
      );
      expect(userInstances).toEqual(1);
    });
  });
};

module.exports = runTicketTests;
