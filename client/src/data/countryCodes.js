/**
 * Dial codes for the phone field's country picker.
 *
 * Stored as [name, iso2, dial, min, max] tuples so the file stays readable; the
 * flag is derived from the ISO code at runtime rather than pasted in as a
 * literal. Note that flag emoji have no glyph on Windows, so every surface that
 * shows a flag must also show the dial code or the ISO code, never the flag
 * alone.
 *
 * `min`/`max` are the accepted digit counts of the *national significant
 * number*, i.e. what the visitor types after the dial code and without the
 * national trunk prefix ("0300 1234567" in Pakistan counts as 10, not 11).
 * They are deliberately a little permissive: rejecting a real lead over a
 * numbering-plan edge case costs far more than accepting a slightly odd number.
 */
const RAW = [
  ["United States", "US", "+1", 10, 10],
  ["Canada", "CA", "+1", 10, 10],
  ["United Kingdom", "GB", "+44", 9, 10],
  ["United Arab Emirates", "AE", "+971", 8, 9],
  ["Saudi Arabia", "SA", "+966", 9, 9],
  ["Pakistan", "PK", "+92", 10, 10],
  ["India", "IN", "+91", 10, 10],
  ["Australia", "AU", "+61", 9, 9],
  ["Germany", "DE", "+49", 7, 11],
  ["France", "FR", "+33", 9, 9],
  ["Netherlands", "NL", "+31", 9, 9],
  ["Singapore", "SG", "+65", 8, 8],
  ["Afghanistan", "AF", "+93", 9, 9],
  ["Albania", "AL", "+355", 8, 9],
  ["Algeria", "DZ", "+213", 9, 9],
  ["Argentina", "AR", "+54", 10, 11],
  ["Armenia", "AM", "+374", 8, 8],
  ["Austria", "AT", "+43", 7, 13],
  ["Azerbaijan", "AZ", "+994", 9, 9],
  ["Bahrain", "BH", "+973", 8, 8],
  ["Bangladesh", "BD", "+880", 10, 10],
  ["Belarus", "BY", "+375", 9, 9],
  ["Belgium", "BE", "+32", 8, 9],
  ["Bolivia", "BO", "+591", 8, 8],
  ["Bosnia and Herzegovina", "BA", "+387", 8, 8],
  ["Brazil", "BR", "+55", 10, 11],
  ["Bulgaria", "BG", "+359", 8, 9],
  ["Cambodia", "KH", "+855", 8, 9],
  ["Cameroon", "CM", "+237", 9, 9],
  ["Chile", "CL", "+56", 9, 9],
  ["China", "CN", "+86", 11, 11],
  ["Colombia", "CO", "+57", 10, 10],
  ["Costa Rica", "CR", "+506", 8, 8],
  ["Croatia", "HR", "+385", 8, 9],
  ["Cyprus", "CY", "+357", 8, 8],
  ["Czechia", "CZ", "+420", 9, 9],
  ["Denmark", "DK", "+45", 8, 8],
  ["Dominican Republic", "DO", "+1809", 7, 7],
  ["Ecuador", "EC", "+593", 8, 9],
  ["Egypt", "EG", "+20", 10, 10],
  ["Estonia", "EE", "+372", 7, 8],
  ["Ethiopia", "ET", "+251", 9, 9],
  ["Finland", "FI", "+358", 9, 10],
  ["Georgia", "GE", "+995", 9, 9],
  ["Ghana", "GH", "+233", 9, 9],
  ["Greece", "GR", "+30", 10, 10],
  ["Guatemala", "GT", "+502", 8, 8],
  ["Hong Kong", "HK", "+852", 8, 8],
  ["Hungary", "HU", "+36", 9, 9],
  ["Iceland", "IS", "+354", 7, 7],
  ["Indonesia", "ID", "+62", 9, 12],
  ["Iraq", "IQ", "+964", 10, 10],
  ["Ireland", "IE", "+353", 9, 9],
  ["Israel", "IL", "+972", 9, 9],
  ["Italy", "IT", "+39", 9, 10],
  ["Ivory Coast", "CI", "+225", 10, 10],
  ["Jamaica", "JM", "+1876", 7, 7],
  ["Japan", "JP", "+81", 9, 10],
  ["Jordan", "JO", "+962", 9, 9],
  ["Kazakhstan", "KZ", "+7", 10, 10],
  ["Kenya", "KE", "+254", 9, 9],
  ["Kuwait", "KW", "+965", 8, 8],
  ["Kyrgyzstan", "KG", "+996", 9, 9],
  ["Latvia", "LV", "+371", 8, 8],
  ["Lebanon", "LB", "+961", 7, 8],
  ["Libya", "LY", "+218", 9, 9],
  ["Lithuania", "LT", "+370", 8, 8],
  ["Luxembourg", "LU", "+352", 9, 9],
  ["Malaysia", "MY", "+60", 9, 10],
  ["Maldives", "MV", "+960", 7, 7],
  ["Malta", "MT", "+356", 8, 8],
  ["Mexico", "MX", "+52", 10, 10],
  ["Moldova", "MD", "+373", 8, 8],
  ["Mongolia", "MN", "+976", 8, 8],
  ["Montenegro", "ME", "+382", 8, 8],
  ["Morocco", "MA", "+212", 9, 9],
  ["Myanmar", "MM", "+95", 8, 10],
  ["Nepal", "NP", "+977", 10, 10],
  ["New Zealand", "NZ", "+64", 8, 10],
  ["Nigeria", "NG", "+234", 10, 10],
  ["North Macedonia", "MK", "+389", 8, 8],
  ["Norway", "NO", "+47", 8, 8],
  ["Oman", "OM", "+968", 8, 8],
  ["Panama", "PA", "+507", 7, 8],
  ["Paraguay", "PY", "+595", 9, 9],
  ["Peru", "PE", "+51", 9, 9],
  ["Philippines", "PH", "+63", 10, 10],
  ["Poland", "PL", "+48", 9, 9],
  ["Portugal", "PT", "+351", 9, 9],
  ["Qatar", "QA", "+974", 8, 8],
  ["Romania", "RO", "+40", 9, 9],
  ["Russia", "RU", "+7", 10, 10],
  ["Rwanda", "RW", "+250", 9, 9],
  ["Senegal", "SN", "+221", 9, 9],
  ["Serbia", "RS", "+381", 8, 9],
  ["Slovakia", "SK", "+421", 9, 9],
  ["Slovenia", "SI", "+386", 8, 8],
  ["South Africa", "ZA", "+27", 9, 9],
  ["South Korea", "KR", "+82", 9, 10],
  ["Spain", "ES", "+34", 9, 9],
  ["Sri Lanka", "LK", "+94", 9, 9],
  ["Sweden", "SE", "+46", 7, 9],
  ["Switzerland", "CH", "+41", 9, 9],
  ["Taiwan", "TW", "+886", 9, 9],
  ["Tanzania", "TZ", "+255", 9, 9],
  ["Thailand", "TH", "+66", 9, 9],
  ["Tunisia", "TN", "+216", 8, 8],
  ["Turkey", "TR", "+90", 10, 10],
  ["Uganda", "UG", "+256", 9, 9],
  ["Ukraine", "UA", "+380", 9, 9],
  ["Uruguay", "UY", "+598", 8, 8],
  ["Uzbekistan", "UZ", "+998", 9, 9],
  ["Venezuela", "VE", "+58", 10, 10],
  ["Vietnam", "VN", "+84", 9, 10],
  ["Yemen", "YE", "+967", 9, 9],
  ["Zambia", "ZM", "+260", 9, 9],
  ["Zimbabwe", "ZW", "+263", 9, 9],
];

/** ISO 3166-1 alpha-2 -> regional indicator pair, e.g. "US" -> 🇺🇸. */
function flagOf(iso) {
  return String.fromCodePoint(...[...iso].map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

export const COUNTRIES = RAW.map(([name, iso, dial, min, max]) => ({
  name,
  iso,
  dial,
  min,
  max,
  flag: flagOf(iso),
}));

/** Dial code -> digit range, so the server can re-check a "+92 300…" string. */
export const LENGTHS_BY_DIAL = COUNTRIES.reduce((acc, c) => {
  // Several countries share a dial code (US/CA on +1); widen the range so the
  // shared code accepts every plan that uses it.
  const prev = acc[c.dial];
  acc[c.dial] = prev
    ? { min: Math.min(prev.min, c.min), max: Math.max(prev.max, c.max) }
    : { min: c.min, max: c.max };
  return acc;
}, {});

/** The picker opens on the US, which is where the business phone line sits. */
export const DEFAULT_COUNTRY = COUNTRIES[0];

export function findCountry(iso) {
  return COUNTRIES.find((c) => c.iso === iso) || DEFAULT_COUNTRY;
}
