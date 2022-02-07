// tags function
export const tagsSeparator = (string, separators) => {
  let inferredSeparator = ''
  let options = []

  if (separators?.length) {
    const reg = /\W/

    separators.forEach((separator) => {
      // Check separators validity
      if (!reg.test(separator)) {
        throw new Error('Separators may only include special characters')
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
  const specialChars = ['.', '*', '?', '$', '^', '(', ')']
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

//
