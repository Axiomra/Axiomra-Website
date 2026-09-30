import { describe, expect, it } from "vitest";
import { isSupportedCountry } from "libphonenumber-js/min";
import { COUNTRIES, findCountry } from "../data/countryCodes";
import { formatPhone, validatePhone } from "./validation";

const US = findCountry("US");
const PK = findCountry("PK");

describe("validatePhone", () => {
  it("knows every country in the picker", () => {
    expect(COUNTRIES.filter((c) => !isSupportedCountry(c.iso)).map((c) => c.iso)).toEqual([]);
  });

  it("accepts a real number for the selected country", () => {
    expect(validatePhone("212 555 1234", US)).toBe("");
    expect(validatePhone("0300 1234567", PK)).toBe("");
    expect(validatePhone("300-1234567", PK)).toBe("");
  });

  it("rejects another country's number of the same length", () => {
    expect(validatePhone("3001234567", US)).not.toBe("");
    // An Indian mobile: ten digits, but 987 is not a US area code.
    expect(validatePhone("9876543210", US)).not.toBe("");
  });

  it("names the country when a different dial code is typed in", () => {
    expect(validatePhone("+92 300 1234567", US)).toMatch(/Pakistan \(\+92\)/);
    expect(validatePhone("+1 212 555 1234", US)).toBe("");
  });

  it("explains a short or long number", () => {
    expect(validatePhone("300123", PK)).toMatch(/too short/);
    expect(validatePhone("30012345678901", PK)).toMatch(/too long/);
  });

  it("handles picker entries that fold the area code into the dial code", () => {
    expect(validatePhone("555 1234", findCountry("DO"))).toBe("");
  });

  it("only requires a number when asked to", () => {
    expect(validatePhone("", US)).toBe("");
    expect(validatePhone("", US, { required: true })).not.toBe("");
  });
});

describe("formatPhone", () => {
  it("returns one international string", () => {
    expect(formatPhone("0300 1234567", PK)).toBe("+92 300 1234567");
    expect(formatPhone("555 1234", findCountry("DO"))).toBe("+1 809 555 1234");
  });
});
