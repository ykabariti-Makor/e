const magnitudeUnits = {
  1: "K",
  2: "M",
  3: "G",
};

const numFormatter = (
  numToFormat,
  { overallDigitLimit = 10, decimalDigitLimit = 2 }
) => {
  const isFloatingPoint = String(numToFormat).includes(".") ? 1 : 0;
  let processedNumber;
  //!floating point cutting
  if (isFloatingPoint)
    processedNumber = decimalHandler(numToFormat, decimalDigitLimit);

  processedNumber = String(processedNumber);

  let unitSuffix;
  if (processedNumber.length - isFloatingPoint > overallDigitLimit) {
    //!main numer formatting
    overallHandlement = overallHandler(
      processedNumber,
      overallDigitLimit,
      isFloatingPoint
    );

    processedNumber = overallHandlement.num;
    unitSuffix = overallHandlement.unitSuffix;
  }

  //!adding commas

  const [left, right] = processedNumber.split(".");

  return (
    left.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (right ? "." + right : "") +
    (unitSuffix ?? "")
  );
};

//////////////////! DECIMAL LIMITER
const decimalHandler = (numToFormat, decimalDigitLimit) => {
  //!DONE WITH
  return numToFormat.toFixed(decimalDigitLimit);
};

//////////////////! OVERALL LIMITER - MATH BASED
const overallHandler = (num, limit, isFloatingPoint) => {
  //!slice away right of point
  while (num.length - isFloatingPoint > limit) {
    num = num.substring(0, num.length - 1);

    if (num.length - isFloatingPoint === limit) {
      return { num }; //!probably need to get rid of floating point
    }
    if (num.charAt(num.length - 1) === ".") {
      num = num.substring(0, num.length - 1);
      break;
    }
  }

  // //!check if meets requirement - then return

  let thousandsSliced = 0,
    remainder;
  //!keep slicing away left of point - by block of 3's
  while (num.length > limit) {
    remainder = num.substring(num.length - 3);
    num = num.substring(0, num.length - 3);

    thousandsSliced++;
  }

  return {
    num:
      num +
      (limit - num.length ? "." : "") +
      remainder.substring(0, limit - num.length),
    unitSuffix: magnitudeUnits[thousandsSliced],
  };
};