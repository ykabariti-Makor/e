const { setConfig } = require("./config");
const {
  tagsSeparator,
  numFormatter,
  phoneNumberFormatter,
} = require("./utils/modifies");
const { URLValidator, passwordValidation } = require("./utils/auth");

module.exports = {
  URLValidator,
  passwordValidation,
  setConfig,
  tagsSeparator,
  numFormatter,
  phoneNumberFormatter,
};

console.log(
  "🚀 ~ file: main.js ~ line 12 ~ numFormatter('123.234')",
  numFormatter("123")
);

console.log(
  "🚀 ~ file: main.js ~ line 12 ~ numFormatter('123.234')",
  numFormatter("123.123")
);

console.log(
  "🚀 ~ file: main.js ~ line 12 ~ numFormatter('123.234')",
  numFormatter("123123")
);

console.log(
  "🚀 ~ file: main.js ~ line 12 ~ numFormatter('123.234')",
  numFormatter("123123.123123")
);

console.log(
  "🚀 ~ file: main.js ~ line 12 ~ numFormatter('123.234')",
  numFormatter("123123123")
);

console.log(
  "🚀 ~ file: main.js ~ line 12 ~ numFormatter('123.234')",
  numFormatter("123123123.123123")
);

console.log(
  "🚀 ~ file: main.js ~ line 12 ~ numFormatter('123.234')",
  numFormatter("123123.1231231231")
);
