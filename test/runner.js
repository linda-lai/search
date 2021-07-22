const { runSearchTests } = require("./search-test");
const { runOrganizationTests } = require("./organization-test");
const { runUtilsTests } = require("./utils-test");

const runTestSuite = () => {
  runSearchTests();
  runUtilsTests();
  runOrganizationTests();
};

runTestSuite();
