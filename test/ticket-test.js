const fs = require("fs");
const path = require("path");

const Ticket = require("../src/ticket");
const {
  printTestFileHeader,
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
    test("query value exists in array attribute in a record", () => {
      const queryField = "tags";
      const queryValue = "Ohio";
      expect(ticket.match(queryField, queryValue)).toEqual(true);
    });

    test("query value is strictly equal with attribute value found with field: submitter_id", () => {
      expect(ticket.match("submitter_id", 38)).toEqual(true);
    });

    test("query value isn't strictly equal with attribute value found with query field: submitter_id", () => {
      expect(ticket.match("submitter_id", "38")).toEqual(false);
    });

    test("field: description is defined and query value is null", () => {
      expect(ticket.match("description", null)).toEqual(true);
    });

    test("field: assignee_id is undefined and query value is null", () => {
      expect(ticket.match("assignee_id", null)).toEqual(true);
    });

    test("field: subject exists and query value is empty string", () => {
      expect(ticket.match("subject", "")).toEqual(true);
    });
  });

  describe("Ticket method getRelatedEntities() returns related user and organization records", () => {
    test("IDs of related entities returned for organization record with _id: 114", () => {
      const actual = ticket.getRelatedRecords(data);
      const actualRelatedRecordIDs = actual.map(
        (record) => record.attributes._id
      );
      const expectedRelatedRecordIDs = [38, 116];

      expect(
        actualRelatedRecordIDs.every((id) =>
          expectedRelatedRecordIDs.includes(id)
        )
      ).toEqual(true);

      expect(actual).toHaveLength(2);
    });
  });
};

module.exports = runTicketTests;
