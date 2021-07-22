const runOrganizationTests = require("./organization-test");
const runTicketTests = require("./ticket-test");
const runSearchTests = require("./search-test");
const runUtilsTests = require("./utils-test");

const runTestSuite = () => {
  runOrganizationTests();
  runTicketTests();
  runSearchTests();
  runUtilsTests();
};

runTestSuite();
