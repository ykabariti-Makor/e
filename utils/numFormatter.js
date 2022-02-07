const { config } = require("../config");
const { overallDigitLimit, decimalDigitLimit } = config.numsFormater;

const magnitudeUnits = {
  1: "K",
  2: "M",
  3: "G",
};

const numFormatter = (numToFormat) => {
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

const overallHandler2 = (num, limit, integralDigits) => {
  num = Number(num);
  //! if the num is bigger than 1000 handle it normally
  if (num > 1000) {
    let fixedNum = null;
    let remains = null;
    let diffrence = null;
    let order = null;

    if (num >= magnitudes.GIGA) order = "GIGA";
    else if (num >= magnitudes.MEGA) order = "MEGA";
    else order = "KILO";

    remains = String(num % magnitudes[order]);
    fixedNum = (num / magnitudes[order]).toFixed(1).replace(/\.0$/, "");
    diffrence = limit - (fixedNum.length - 1);
    if (diffrence > 0) {
      fixedNum = fixedNum + remains.substring(0, diffrence);

      fixedNum = fixedNum + order.charAt(0);

      return fixedNum;
    }
    //!if the num is smaller than 1000 handle it the following way
  } else {
    //!count the number digits without the dot
    let cleanNumber = String(num).replace(".", "");
    if (cleanNumber.length <= limit) {
      //!send the number back?
      return num;
    } else {
      //!got floating point
      if (String(num).includes(".")) {
        //!seperate the left and right digits
        let [leftDigits, rightDigits] = String(num).split(".");
        //!handle the right digits first
        while (rightDigits.length) {
          //! if the overall digits count is larger than the limit start popping digits from the right
          if (leftDigits.length + rightDigits.length > limit) {
            rightDigits = rightDigits.slice(0, -1);
          } else {
            break;
          }
        }
        //!check if after the right digits slicing the num meets the limit requirement
        if (leftDigits.length + rightDigits.length <= limit) {
          //!send the number back
          //!the number is still not meeting the limit, handling the left digits
        } else {
        }
      }
      //!no floationg point
      else {
      }
    }
  }
};

const options = { overallDigitLimit: 10, decimalDigitLimit: 2 };

module.exports = {
  numFormatter,
};
