// Google Calendar appointment schedule. The "/u/0" account segment is left out
// on purpose: it pins the page to the viewer's first signed-in Google account,
// which breaks the embed for logged-out visitors and multi-account users.
export const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ025W3qESqeOfXDNLvDm5cSJN0jIJMBMa-fVqkCDbSSulxioKU7lGFMzPZ8ERyV6UAQf1BRaxvO";

export const BOOKING_EMBED_URL = `${BOOKING_URL}?gv=true`;
