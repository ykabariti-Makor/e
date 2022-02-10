"use strict";

var _main = require("../main");

test('simple input - successes', async () => {
  (0, _main.setConfig)('phoneNumberFormatter', {
    format: '3-8'
  });
  await expect((0, _main.phoneNumberFormatter)('12345678765')).toStrictEqual({
    data: '123-45678765',
    message: 'Phone number successfully formatted',
    success: true
  });
});
test('simple input with isInternational: false- successes', async () => {
  (0, _main.setConfig)('phoneNumberFormatter', {
    format: '3-4-4',
    isInternational: false
  });
  await expect((0, _main.phoneNumberFormatter)('12345678765')).toStrictEqual({
    data: '4567-8765',
    message: 'Phone number successfully formatted',
    success: true
  });
});
test('phone number length test - error', async () => {
  (0, _main.setConfig)('phoneNumberFormatter', {
    format: '3-8-5'
  });
  await expect((0, _main.phoneNumberFormatter)('123-4567-876544133')).toStrictEqual({
    success: false,
    message: 'Phone number length can contain only 7-15 digits'
  });
});
test('phone number format test - error', async () => {
  (0, _main.setConfig)('phoneNumberFormatter', {
    format: '3-8'
  });
  await expect((0, _main.phoneNumberFormatter)('123-4567-876544133')).toStrictEqual({
    success: false,
    message: 'Format does not match no. of digits in phone number'
  });
});
test('phone number format invalid - error', async () => {
  (0, _main.setConfig)('phoneNumberFormatter', {
    format: '3-3-4'
  });
  await expect((0, _main.phoneNumberFormatter)('123$456$4133')).toStrictEqual({
    success: false,
    message: 'Phone number input is invalid'
  });
});
test('user sends words with a number of separators between them; function cleans separators that might be recognized as tags', async () => {
  await expect((0, _main.tagsSeparator)('tag1 | tag2')).toStrictEqual({
    success: true,
    message: 'Tags array created successfully',
    data: ['tag1', 'tag2']
  });
});
test('user does not send separators, the string is split using the most frequent special char - successes', async () => {
  await expect((0, _main.tagsSeparator)('a,b,c,d,e,f')).toStrictEqual({
    data: ['a', 'b', 'c', 'd', 'e', 'f'],
    message: 'Tags array created successfully',
    success: true
  });
});
test('user sends duplicate words, function returns only unique tags - successes', async () => {
  await expect((0, _main.tagsSeparator)('sea-sun-moon-sea')).toStrictEqual({
    success: true,
    message: 'Tags array created successfully',
    data: ['sea', 'sun', 'moon']
  });
});
test('user sends one separator - string is split according to it (even if it is not the most frequent) - successes', async () => {
  (0, _main.setConfig)('tagsSeparator', {
    separators: [',']
  });
  await expect((0, _main.tagsSeparator)('a:b:c:d,e,f')).toStrictEqual({
    data: ['a:b:c:d', 'e', 'f'],
    message: 'Tags array created successfully',
    success: true
  });
});
test('user sends a couple of separators , string is split according to the most frequent among them  - successes', async () => {
  (0, _main.setConfig)('tagsSeparator', {
    separators: [',', '-']
  });
  await expect((0, _main.tagsSeparator)('a,b,c-d,e,f,a-b-c-d-e-f')).toStrictEqual({
    data: ['a,b,c', 'd,e,f,a', 'b', 'c', 'd', 'e', 'f'],
    message: 'Tags array created successfully',
    success: true
  });
});
test('user sends separators that do not exist in string , function sends back array with one unsplit string - successes', async () => {
  (0, _main.setConfig)('tagsSeparator', {
    separators: ['|', '.']
  });
  await expect((0, _main.tagsSeparator)('a,b,c-d,e,f,a-b-c-d-e-f')).toStrictEqual({
    data: ['a,b,c-d,e,f,a-b-c-d-e-f'],
    message: 'Tags array created successfully',
    success: true
  });
});
test('user sends empty separators array, string is split according to most frequent special char', async () => {
  (0, _main.setConfig)('tagsSeparator', {
    separators: []
  });
  await expect((0, _main.tagsSeparator)('a,b,c-d,e,f,a-b-c-d-e-f')).toStrictEqual({
    data: ['a,b,c', 'd,e,f,a', 'b', 'c', 'd', 'e', 'f'],
    message: 'Tags array created successfully',
    success: true
  });
});
test('double char separator - error', async () => {
  (0, _main.setConfig)('tagsSeparator', {
    separators: [',,']
  });
  await expect((0, _main.tagsSeparator)('a,b,c,d,e,f')).toStrictEqual({
    message: 'Separators may only include one character each.',
    success: false
  });
});
test('separator doesnt contains special char - error', async () => {
  (0, _main.setConfig)('tagsSeparator', {
    separators: ['3']
  });
  await expect((0, _main.tagsSeparator)('a3b3c3d3e3f')).toStrictEqual({
    message: 'Separators may only include special characters.',
    success: false
  });
});
test('user sends string with unneeded spaces at the start/end of the string', async () => {
  await expect((0, _main.removeSpaces)('   user sends empty separators array, string is split according to most frequent char')).toStrictEqual({
    data: 'user sends empty separators array, string is split according to most frequent char',
    message: 'Spaces removed successfully',
    success: true
  });
});
test('user sends string with unneeded spaces between words (more then one space)', async () => {
  await expect((0, _main.removeSpaces)('user      sends empty separators array, string is split according to most frequent char')).toStrictEqual({
    data: 'user sends empty separators array, string is split according to most frequent char',
    message: 'Spaces removed successfully',
    success: true
  });
});
test('user sends string with unneeded spaces between words and punctuation marks (even one space is considered unneeded)', async () => {
  await expect((0, _main.removeSpaces)('user sends empty separators array , string is split according to most frequent char')).toStrictEqual({
    data: 'user sends empty separators array, string is split according to most frequent char',
    message: 'Spaces removed successfully',
    success: true
  });
});
test('user sends string with unneeded whitespace created by tabs', async () => {
  await expect((0, _main.removeSpaces)('user sends empty separators array , string is split according to most frequent char')).toStrictEqual({
    data: 'user sends empty separators array, string is split according to most frequent char',
    message: 'Spaces removed successfully',
    success: true
  });
});
describe(`~~~~~~~~~~~ ~ ~ ~ ### @ @ @                                  @ @ @ ### ~ ~ ~ ~~~~~~~~~~~
~~~~~~~~~~~ ~ ~ ~ ### @ @ @     Testing Number Formatter     @ @ @ ### ~ ~ ~ ~~~~~~~~~~~
~~~~~~~~~~~ ~ ~ ~ ### @ @ @                                  @ @ @ ### ~ ~ ~ ~~~~~~~~~~~\n`, () => {
  test('Test No. 1', async () => {
    await expect((0, _main.numberFormatter)('234')).toEqual(expect.objectContaining({
      success: false
    }));
  });
  test('Test No. 2', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 10,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(234)).toEqual(expect.objectContaining({
      data: {
        number: '234'
      }
    }));
  });
  test('Test No. 3', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 2,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(234)).toEqual(expect.objectContaining({
      data: {
        number: '0.2K'
      }
    }));
  });
  test('Test No. 4', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 3,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(234234)).toEqual(expect.objectContaining({
      data: {
        number: '234K'
      }
    }));
  });
  test('Test No. 5', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 2,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(234234)).toEqual(expect.objectContaining({
      data: {
        number: '0.2M'
      }
    }));
  });
  test('Test No. 6', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 3,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(234234)).toEqual(expect.objectContaining({
      data: {
        number: '234K'
      }
    }));
  });
  test('Test No. 7', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 10,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(234.234)).toEqual(expect.objectContaining({
      data: {
        number: '234.23'
      }
    }));
  });
  test('Test No. 8', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 1,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(0.234)).toEqual(expect.objectContaining({
      data: {
        number: '0'
      }
    }));
  });
  test('Test No. 9', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 2,
      decimalDigitLimit: 1
    });
    await expect((0, _main.numberFormatter)(0.234)).toEqual(expect.objectContaining({
      data: {
        number: '0.2'
      }
    }));
  });
  test('Test No. 10', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 1,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(1000000000)).toEqual(expect.objectContaining({
      data: {
        number: '1B'
      }
    }));
  });
  test('Test No. 11', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 2,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(100000000)).toEqual(expect.objectContaining({
      data: {
        number: '0.1B'
      }
    }));
  });
  test('Test No. 12', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 2,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(10000000)).toEqual(expect.objectContaining({
      data: {
        number: '10M'
      }
    }));
  });
  test('Test No. 13', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 2,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(1000000)).toEqual(expect.objectContaining({
      data: {
        number: '1.0M'
      }
    }));
  });
  test('Test No. 14', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 10,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(234234.234)).toEqual(expect.objectContaining({
      data: {
        number: '234,234.23'
      }
    }));
  });
  test('Test No. 15', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 10,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(234)).toEqual(expect.objectContaining({
      data: {
        number: '234'
      }
    }));
  });
  test('Test No. 16', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 2,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(-1234)).toEqual(expect.objectContaining({
      data: {
        number: '-1.2K'
      }
    }));
  });
  test('Test No. 17', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 2,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(-0.5)).toEqual(expect.objectContaining({
      data: {
        number: '-0.5'
      }
    }));
  });
  test('Test No. 18', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 2,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(-0.5)).toEqual(expect.objectContaining({
      data: {
        number: '-0.5'
      }
    }));
  });
  test('Test No. 19', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 10,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(5000000000)).toEqual(expect.objectContaining({
      data: {
        number: '5,000,000,000'
      }
    }));
  });
  test('Test No. 20', async () => {
    (0, _main.setConfig)('numberFormatter', {
      overallDigitLimit: 2,
      decimalDigitLimit: 2
    });
    await expect((0, _main.numberFormatter)(-0.5)).toEqual(expect.objectContaining({
      data: {
        number: '-0.5'
      }
    }));
  });
}); // Success situation when no configuration function.

test('specialCharModifier', async () => {
  await expect((0, _main.specialCharsModifier)('av!iv @ avisrur $# !&*')).toStrictEqual({
    success: true,
    message: 'String successfully modified',
    data: 'aviv  avisrur  '
  });
}); // Success situation when config the function.

test('specialCharModifier', async () => {
  (0, _main.setConfig)('specialCharsModifier', {
    exceptions: '@#$'
  });
  await expect((0, _main.specialCharsModifier)('av!iv @ avisrur $# !&*')).toStrictEqual({
    success: true,
    message: 'String successfully modified',
    data: 'aviv @ avisrur $# '
  });
}); // Success situation when no configuration function.

test('specialCharModifier', async () => {
  await expect((0, _main.specialCharsModifier)(12345)).toStrictEqual({
    success: false,
    message: '12345 should be string'
  });
});