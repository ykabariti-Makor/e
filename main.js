/**
 * Get URL, and 2 optional parameters
 * @returns Modified URL
 */
const URLValidator = (url, domainOnly = false, pathIncluded = true) => {
  const isValid = isURLValid(url)
  const urlObject = new URL(url)

  // Check for URL validity
  if (!isValid) throw new Error('URL is invalid')

  if (domainOnly && pathIncluded) {
    // Return URL domain & path
    return (url = urlObject.hostname + urlObject.pathname) // figma.com/file/Dk5ed
  } else if (domainOnly) {
    // Return URL domain
    return (url = urlObject.hostname) // figma.com
  } else if (!domainOnly && !pathIncluded) {
    // Return URL without path
    return (url = urlObject.origin) // https://www.figma.com
  }

  // Return full URL
  return url
}

const isURLValid = (url) => {
  // Checks for URL validity
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(url)
}

export default {
  URLValidator,
  isURLValid,
}
