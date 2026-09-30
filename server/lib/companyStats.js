/**
 * Copy of client/src/data/companyStats.js for the chat prompt. The server is
 * deployed separately and cannot import client code; tests/companyStats.test.js
 * fails if the two files disagree, so edit both together.
 */
export const companyStats = {
  projects: 500,
  experts: 85,
  countries: 30,
  partnerships: 170,
  industries: 12,
  pocRange: { min: 11, max: 21 },
};
