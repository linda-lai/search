const runOrganizationTests = require("./organization-test");
const runSearchTests = require("./search-test");
const runTicketTests = require("./ticket-test");
const runUserTests = require("./user-test");
const runUtilsTests = require("./utils-test");

const runTestSuite = () => {
  runOrganizationTests();
  runSearchTests();
  runTicketTests();
  runUserTests();
  runUtilsTests();
};

runTestSuite();
