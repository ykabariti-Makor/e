const config = {
  phoneNumberformat: "3-2-3-4",
  isInternational: true,
};
/**
 * The function phoneNumberFormatter validates the phone number it receives and returns it in a certain format.
   It expects 1-3 arguments:
 * @param {string} number  Phone number is mandatory ,need to be inserted as a string.
 * @param {string} format  The format must match in length to the phone number length and contain country code prefix".
//    The default format is "3-2-3-4". (e.g."3-3-4-2").
 * @param {boolean} isInternational a boolean that indicates whether the returned number should be in an international format or not.
//     The default is true (international format).
 * @returns 
 */
const phoneNumberFormatter = (
  number,
  format = config.phoneNumberformat,
  isInternational = config.isInternational,
) => {
  const arr = format.split("-").map((str) => +str);
  const sum = arr.reduce((acc, item) => acc + item);
  const regexFormat =
    /^([\+]?[\(]?[0-9]{1,3}[\)]?)([\s.-]?[0-9]{1,12})([\s.-]?[0-9]{1,6}?)([\s.-]?[0-9]{1,4})$/;
  if (!regexFormat.test(number)) {
    return {
      success: false,
      message: "Phone number input is invalid",
    };
  }

  const cleanNumber = number.replace(/[^0-9]/g, "");
  if (sum !== cleanNumber.length) {
    return "Format does not match no. of digits in phone no.";
  }

  if (cleanNumber.length >= 7 && cleanNumber.length <= 15) {
    let formattedNumber = "";
    let count = 0;
    let a;
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        formattedNumber = cleanNumber.slice(0, arr[i]);
        count += +arr[i];
      } else {
        formattedNumber = formattedNumber.concat(
          "-" + cleanNumber.slice(count, count + arr[i]),
        );
        count += +arr[i];
      }
    }
    if (!isInternational) {
      return formattedNumber.slice(arr[0] + 1);
    }
    
    return {
      success: true,
      message: "Phone number successfully formatted",
      data: formattedNumber,
    };
  }
};

