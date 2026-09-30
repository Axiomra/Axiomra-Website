/**
 * Company-wide figures shown across the site (stat strips, FAQs, page copy).
 * Every page imports them from here so the numbers can never disagree.
 *
 * Counts render with a "+" suffix ("500+"). pocRange is the proof-of-concept
 * price range in USD thousands, also the PoC base in the cost estimator.
 *
 * The chat server keeps a copy in server/lib/companyStats.js (it is deployed
 * separately and cannot import client code); a server test fails if the two
 * drift apart.
 */
export const companyStats = {
  projects: 500,
  experts: 85,
  countries: 30,
  partnerships: 170,
  industries: 12,
  pocRange: { min: 11, max: 21 },
};
