const { setConfig } = require("../../config");
const { numFormatter } = require("../../utils/modifies");

describe(`~~~~~~~~~~~ ~ ~ ~ ### @ @ @                                  @ @ @ ### ~ ~ ~ ~~~~~~~~~~~
~~~~~~~~~~~ ~ ~ ~ ### @ @ @     Testing Number Formatter     @ @ @ ### ~ ~ ~ ~~~~~~~~~~~
~~~~~~~~~~~ ~ ~ ~ ### @ @ @                                  @ @ @ ### ~ ~ ~ ~~~~~~~~~~~\n`, () => {
  test("Test No. 1", () => {
    expect(numFormatter("234")).toEqual(
      expect.objectContaining({
        success: false,
      })
    );
  });

  test("Test No. 2", () => {
    setConfig("formatter", {
      overallDigitLimit: 10,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(234)).toEqual(
      expect.objectContaining({
        data: { number: "234" },
      })
    );
  });

  test("Test No. 3", () => {
    setConfig("formatter", {
      overallDigitLimit: 2,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(234)).toEqual(
      expect.objectContaining({
        data: { number: "0.2K" },
      })
    );
  });

  test("Test No. 4", () => {
    setConfig("formatter", {
      overallDigitLimit: 3,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(234234)).toEqual(
      expect.objectContaining({
        data: { number: "234K" },
      })
    );
  });

  test("Test No. 5", () => {
    setConfig("formatter", {
      overallDigitLimit: 2,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(234234)).toEqual(
      expect.objectContaining({
        data: { number: "0.2M" },
      })
    );
  });

  test("Test No. 6", () => {
    setConfig("formatter", {
      overallDigitLimit: 3,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(234234)).toEqual(
      expect.objectContaining({
        data: { number: "234K" },
      })
    );
  });

  test("Test No. 7", () => {
    setConfig("formatter", {
      overallDigitLimit: 10,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(234.234)).toEqual(
      expect.objectContaining({
        data: { number: "234.23" },
      })
    );
  });

  test("Test No. 8", () => {
    setConfig("formatter", {
      overallDigitLimit: 1,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(0.234)).toEqual(
      expect.objectContaining({
        data: { number: "0" },
      })
    );
  });

  test("Test No. 9", () => {
    setConfig("formatter", {
      overallDigitLimit: 2,
      decimalDigitLimit: 1,
    });

    expect(numFormatter(0.234)).toEqual(
      expect.objectContaining({
        data: { number: "0.2" },
      })
    );
  });

  test("Test No. 10", () => {
    setConfig("formatter", {
      overallDigitLimit: 1,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(1000000000)).toEqual(
      expect.objectContaining({
        data: { number: "1G" },
      })
    );
  });

  test("Test No. 11", () => {
    setConfig("formatter", {
      overallDigitLimit: 2,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(100000000)).toEqual(
      expect.objectContaining({
        data: { number: "0.1G" },
      })
    );
  });

  test("Test No. 12", () => {
    setConfig("formatter", {
      overallDigitLimit: 2,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(10000000)).toEqual(
      expect.objectContaining({
        data: { number: "10M" },
      })
    );
  });

  test("Test No. 13", () => {
    setConfig("formatter", {
      overallDigitLimit: 2,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(1000000)).toEqual(
      expect.objectContaining({
        data: { number: "1.0M" },
      })
    );
  });

  test("Test No. 14", () => {
    setConfig("formatter", {
      overallDigitLimit: 10,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(234234.234)).toEqual(
      expect.objectContaining({
        data: { number: "234,234.23" },
      })
    );
  });

  test("Test No. 15", () => {
    setConfig("formatter", {
      overallDigitLimit: 10,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(234)).toEqual(
      expect.objectContaining({
        data: { number: "234" },
      })
    );
  });

  test("Test No. 16", () => {
    setConfig("formatter", {
      overallDigitLimit: 2,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(-1234)).toEqual(
      expect.objectContaining({
        data: { number: "-1.2K" },
      })
    );
  });

  test("Test No. 17", () => {
    setConfig("formatter", {
      overallDigitLimit: 2,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(-0.5)).toEqual(
      expect.objectContaining({
        data: { number: "-0.5" },
      })
    );
  });

  test("Test No. 18", () => {
    setConfig("formatter", {
      overallDigitLimit: 2,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(-0.5)).toEqual(
      expect.objectContaining({
        data: { number: "-0.5" },
      })
    );
  });

  test("Test No. 19", () => {
    setConfig("formatter", {
      overallDigitLimit: 10,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(5000000000)).toEqual(
      expect.objectContaining({
        data: { number: "5,000,000,000" },
      })
    );
  });

  test("Test No. 20", () => {
    setConfig("formatter", {
      overallDigitLimit: 2,
      decimalDigitLimit: 2,
    });

    expect(numFormatter(-0.5)).toEqual(
      expect.objectContaining({
        data: { number: "-0.5" },
      })
    );
  });
});
