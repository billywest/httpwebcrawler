const { normalizeURL } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://www.sirwest.com/contact";
  const actual = normalizeURL(input);
  const expected = "www.sirwest.com/contact";
  expect(actual).toEqual(expected);
});

test("normalizeURL trim trailing slashes", () => {
  const input = "https://www.sirwest.com/contact/";
  const actual = normalizeURL(input);
  const expected = "www.sirwest.com/contact";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://WWW.sirwest.com/contact/";
  const actual = normalizeURL(input);
  const expected = "www.sirwest.com/contact";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "https://www.sirwest.com/contact/";
  const actual = normalizeURL(input);
  const expected = "www.sirwest.com/contact";
  expect(actual).toEqual(expected);
});
