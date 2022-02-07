// The function phoneNumberFormatter validates the phone number it receives and returns it in a certain format.
// It expects 1-3 arguments:
// 1. Phone numer as a string (mandatory)
// 2. Format as a string(e.g."3-3-4-2"). The format must match in length to the phone no. length and contain country code prefix".
//    The default format is "3-2-3-4".
// 3. isInternational is a boolean that indicates whether the returned number should be in an inernational format or not.
//     The default is true (international format).

const config = {
  phoneNumberformat: "3-2-3-4",
  isInternational: true,
};

const phoneNumberFormatter = (
  number,
  format = config.phoneNumberformat,
  isInternational = config.isInternational,
) => {
  const arr = format.split("-").map((str) => +str);
  const sum = arr.reduce((acc, item) => acc + item);
  const regexFormat =
    /^([\+]?[\(]?[0-9]{1,3}[\)]?[\s.-]?[0-9]{1,12})([\s.-]?[0-9]{1,6}?)([\s.-]?[0-9]{1,4})$/;
  const cleanNumber = number.replace(/[^0-9]/g, "");
  if (sum !== cleanNumber.length) {
    console.log(cleanNumber.length);
    return "Format does not match no. of digits in phone no.";
  }

  if (cleanNumber.length >= 7 && cleanNumber.length <= 15) {
    let formatedNumber = "";
    let count = 0;
    let a;
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        formatedNumber = cleanNumber.slice(0, arr[i]);
        count += +arr[i];
      } else {
        formatedNumber = formatedNumber.concat(
          "-" + cleanNumber.slice(count, count + arr[i]),
        );
        count += +arr[i];
      }
    }
    if (!isInternational) {
      return formatedNumber.slice(arr[0] + 1);
    }
    return formatedNumber;
  }
};
//example for input
// const formatted = phoneNumberFormatter("0800 563 5553 1113", "4-3-4-4" );
// console.log(formatted);

module.exports = { phoneNumberFormatter };
