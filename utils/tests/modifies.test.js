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


//************************************************************/

test("simple input - successes", async () => {
  utils.setConfig("tags", {
    separators: [","],
  });
  expect(utils.tagsSeparator("a,b,c,d,e,f")).toStrictEqual({
    data: ["a", "b", "c", "d", "e", "f"],
    message: "Tags array created successfully",
    success: true,
  });
});

test("input without separator , using most frequent char - successes", async () => {
  utils.setConfig("tags", {
    separators: [",","-"],
  });
  expect(utils.tagsSeparator("a,b,c-d,e,f,a-b-c-d-e-f")).toStrictEqual({
    data: [ 'a,b,c', 'd,e,f,a', 'b', 'c', 'd', 'e', 'f' ],
    message: "Tags array created successfully",
    success: true,
  });
});
test("input with multiple separator , using most frequent char - successes", async () => {

  expect(utils.tagsSeparator("a,b,c,d,e,f")).toStrictEqual({
    data: ["a", "b", "c", "d", "e", "f"],
    message: "Tags array created successfully",
    success: true,
  });
});

test("double char seperator - error", async () => {
  utils.setConfig("tags", {
    separators: [",,"],
  });
  expect(utils.tagsSeparator("a,b,c,d,e,f")).toStrictEqual({
    message: 'Separators may only include one character each.',
    success: false,
  });
});
test("seperator doesnt contains special char - error", async () => {
  utils.setConfig("tags", {
    separators: ["3"],
  });
  expect(utils.tagsSeparator("a3b3c3d3e3f")).toStrictEqual({
    message: 'Separators may only include special characters.',
    success: false,
  });
});
