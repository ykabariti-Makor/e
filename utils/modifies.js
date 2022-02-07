const { config } = require('../config')

const tagsSeparator = (string, separators) => {
  let inferredSeparator = ''
  let options = []

  if (separators?.length) {
    const reg = /\W/

    separators.forEach((separator) => {
      // Check separators validity
      if (!reg.test(separator)) {
        return 'Separators may only include special characters'
      }
    })

    // Check items length
    if (separators.length === 1) {
      inferredSeparator = separators[0]
    } else {
      options = [...separators]
    }
  }

  if (!separators || separators.length > 1) {
    // No separator supllied
    const regSeparatorCandidates = /\W/g

    // Capturing special characers- these are the candidates for the separator (with dupicates)
    let specialChars = [...string.matchAll(regSeparatorCandidates)].map((item) => item[0])

    if (separators?.length > 1) {
      // If user supplied legit array of separtor options (more than 1) - the candidates for selected separator will only include user options
      specialChars = specialChars.filter((char) => options.includes(char))
    }

    // Counting frequncy for each candidate
    const count = specialChars.reduce((accumulator, current) => {
      accumulator[current] = accumulator[current] ? (accumulator[current] += 1) : (accumulator[current] = 1)
      return accumulator
    }, {})

    const countsArr = Object.entries(count)

    if (countsArr.length > 1) {
      // If there are several candidates for separators - sort according to count
      countsArr.sort((a, b) => b[1] - a[1])
    }

    // Saving either the only candidate or the candidate with highest count
    inferredSeparator = countsArr[0][0]
  }

  // Moving from the separator as a string to a regex that represents it correctly
  const specialChars = config.tags.specialChars
  let inferredReg

  if (inferredSeparator === ' ') {
    inferredReg = /\s/
  } else if (specialChars.includes(inferredSeparator)) {
    // Add backslash
    inferredReg = new RegExp(`\\${inferredSeparator}`)
  } else {
    inferredReg = new RegExp(inferredSeparator)
  }

  const tags = string.split(inferredReg)

  return tags
}

const magnitudeUnits = {
  1: 'K',
  2: 'M',
  3: 'G',
}

const numFormatter = (numToFormat, { overallDigitLimit = 10, decimalDigitLimit = 2 }) => {
  const isFloatingPoint = String(numToFormat).includes('.') ? 1 : 0
  let processedNumber
  //!floating point cutting
  if (isFloatingPoint) processedNumber = decimalHandler(numToFormat, decimalDigitLimit)

  processedNumber = String(processedNumber)

  let unitSuffix
  if (processedNumber.length - isFloatingPoint > overallDigitLimit) {
    //!main numer formatting
    overallHandlement = overallHandler(processedNumber, overallDigitLimit, isFloatingPoint)

    processedNumber = overallHandlement.num
    unitSuffix = overallHandlement.unitSuffix
  }

  //!adding commas

  const [left, right] = processedNumber.split('.')

  return left.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (right ? '.' + right : '') + (unitSuffix ?? '')
}

//////////////////! DECIMAL LIMITER
const decimalHandler = (numToFormat, decimalDigitLimit) => {
  //!DONE WITH
  return numToFormat.toFixed(decimalDigitLimit)
}

//////////////////! OVERALL LIMITER - MATH BASED
const overallHandler = (num, limit, isFloatingPoint) => {
  //!slice away right of point
  while (num.length - isFloatingPoint > limit) {
    num = num.substring(0, num.length - 1)

    if (num.length - isFloatingPoint === limit) {
      return { num } //!probably need to get rid of floating point
    }
    if (num.charAt(num.length - 1) === '.') {
      num = num.substring(0, num.length - 1)
      break
    }
  }

  // //!check if meets requirement - then return

  let thousandsSliced = 0,
    remainder
  //!keep slicing away left of point - by block of 3's
  while (num.length > limit) {
    remainder = num.substring(num.length - 3)
    num = num.substring(0, num.length - 3)

    thousandsSliced++
  }

  return {
    num: num + (limit - num.length ? '.' : '') + remainder.substring(0, limit - num.length),
    unitSuffix: magnitudeUnits[thousandsSliced],
  }
}
module.exports = {
  numFormatter,
  tagsSeparator,
}
