const utils = require('enigma-x-utilities')

test('simple input - successes', async () => {
  utils.setConfig('phones', {
    format: '3-8',
  })
  expect(utils.phoneNumberFormatter('12345678765')).toStrictEqual({
    data: '123-45678765',
    message: 'Phone number successfully formatted',
    success: true,
  })
})

test('simple input with isInternational: false- successes', async () => {
  utils.setConfig('phones', {
    format: '3-4-4',
    isInternational: false,
  })
  expect(utils.phoneNumberFormatter('12345678765')).toStrictEqual({
    data: '4567-8765',
    message: 'Phone number successfully formatted',
    success: true,
  })
})

test('phone number length test - error', async () => {
  utils.setConfig('phones', {
    format: '3-8-5',
  })
  expect(utils.phoneNumberFormatter('123-4567-876544133')).toStrictEqual({
    success: false,
    message: 'Phone number length can contain only 7-15 digits',
  })
})

test('phone number format test - error', async () => {
  utils.setConfig('phones', {
    format: '3-8',
  })
  expect(utils.phoneNumberFormatter('123-4567-876544133')).toStrictEqual({
    success: false,
    message: 'Format does not match no. of digits in phone number',
  })
})

test('phone number format invalid - error', async () => {
  utils.setConfig('phones', {
    format: '3-3-4',
  })
  expect(utils.phoneNumberFormatter('123$456$4133')).toStrictEqual({
    success: false,
    message: 'Phone number input is invalid',
  })
})
