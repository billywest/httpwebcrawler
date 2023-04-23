const { normalizeURL, getURLsFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://www.sirwest.com/path";
  const actual = normalizeURL(input);
  const expected = "www.sirwest.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL trim trailing slashes", () => {
  const input = "https://www.sirwest.com/path/";
  const actual = normalizeURL(input);
  const expected = "www.sirwest.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://WWW.sirwest.com/path/";
  const actual = normalizeURL(input);
  const expected = "www.sirwest.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "https://www.sirwest.com/path/";
  const actual = normalizeURL(input);
  const expected = "www.sirwest.com/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="http://www.sirwest.com/path/">Sirwest Blog</a>
        </body>
    </html>
    `;

  const inputBaseURL = "http://www.sirwest.com/path/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["http://www.sirwest.com/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="/path/">Sirwest Blog</a>
          </body>
      </html>
      `;

  const inputBaseURL = "http://www.sirwest.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["http://www.sirwest.com/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both relative and absolute", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="/path1/">Sirwest Blog Path One</a>
                <a href="http://www.sirwest.com/path2/">Sirwest Blog Path Two</a>
            </body>
        </html>
        `;

  const inputBaseURL = "http://www.sirwest.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "http://www.sirwest.com/path1/",
    "http://www.sirwest.com/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">Invalid URL</a>
            </body>
        </html>
        `;

  const inputBaseURL = "http://www.sirwest.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
