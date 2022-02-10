"use strict";

var _main = require("../main");

test('url_valid', async () => {
  (0, _main.setConfig)('URLValidator', {
    domainOnly: true,
    pathIncluded: false
  });
  await expect((0, _main.URLValidator)('https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages')).toStrictEqual({
    success: true,
    message: 'Successfully modified URL',
    data: 'docs.npmjs.com'
  });
});
test('password_valid', async () => {
  // Arrange
  (0, _main.setConfig)('password', {
    strengthOptions: [{
      value: 'Weak',
      minDiversity: 1,
      minLength: 12
    }, {
      value: 'Strong',
      minDiversity: 2,
      minLength: 14
    }, {
      value: 'Very Strong',
      minDiversity: 4,
      minLength: 16
    }],
    characterLen: 12,
    upperCase: 1,
    lowerCase: 1,
    num: 1,
    symbol: '#?!@$%^&*-'
  }); //act

  const passwordResult = (0, _main.passwordValidation)('123Aa4@5@#!678'); //assent

  await expect(passwordResult).toStrictEqual({
    validation: [{
      title: 'CharacterLen',
      valid: true,
      re: /^.{12,}$/
    }, {
      title: 'UpperCase',
      valid: true,
      re: /^(.*?[A-Z]){1,}/
    }, {
      title: 'LowerCase',
      valid: true,
      re: /^(.*?[a-z]){1,}/
    }, {
      title: 'Number',
      valid: true,
      re: /^(.*?[0-9]){1,}/
    }, {
      title: 'NonAlphaNumeric',
      valid: true,
      re: /^(.*?[#?!@$%^&*-,])/
    }],
    strength: 'Strong'
  });
});
test('domain list is undefined - error', async () => {
  await expect((0, _main.emailDomainValidator)('ortal0166@gmail.com')).toStrictEqual({
    success: false,
    message: 'domain list is required and must be string or array of strings'
  });
});
test('email input matches domain value single string - successes', async () => {
  (0, _main.setConfig)('emailDomainValidator', {
    domainList: ['makor-capital.com']
  });
  await expect((0, _main.emailDomainValidator)('yonit@makor-capital.com')).toStrictEqual({
    success: true,
    message: 'Email inserted is valid',
    data: true
  });
});
test('email input matches domain list values inside array of strings - successes', async () => {
  (0, _main.setConfig)('emailDomainValidator', {
    domainList: ['makor-capital.com', 'enigma-securities.com']
  });
  await expect((0, _main.emailDomainValidator)('yonit@makor-capital.com')).toStrictEqual({
    success: true,
    message: 'Email inserted is valid',
    data: true
  });
});
test('Domain list is single input number type - error', async () => {
  (0, _main.setConfig)('emailDomainValidator', {
    domainList: 3
  });
  await expect((0, _main.emailDomainValidator)('yonit@makor-capital.com')).toStrictEqual({
    success: false,
    message: 'domain list is required and must be string or array of strings'
  });
});
test('Domain list is array of numbers - error', async () => {
  (0, _main.setConfig)('emailDomainValidator', {
    domainList: [3, 3, 5]
  });
  await expect((0, _main.emailDomainValidator)('yonit@makor-capital.com')).toStrictEqual({
    success: false,
    message: 'domain list must be string or array of strings only'
  });
});
test('email input does not match the domain value single string - error', async () => {
  (0, _main.setConfig)('emailDomainValidator', {
    domainList: 'enigma.com'
  });
  await expect((0, _main.emailDomainValidator)('yonit@makor-capital.com')).toStrictEqual({
    success: false,
    message: 'Email inserted is not in domain list'
  });
});
test('email input does not match domain list values inside array of strings - error', async () => {
  (0, _main.setConfig)('emailDomainValidator', {
    domainList: ['makor-capital.com', 'enigma-securities.com']
  });
  await expect((0, _main.emailDomainValidator)('yonit@makor-group.com')).toStrictEqual({
    success: false,
    message: 'Email inserted is not in domain list'
  });
}); // Fail password scenarios

test('password_valid_fail_senario_1', async () => {
  // Arrange
  (0, _main.setConfig)('password', {
    strengthOptions: [{
      value: 'Weak',
      minDiversity: 1,
      minLength: 12
    }, {
      value: 'Strong',
      minDiversity: 2,
      minLength: 14
    }, {
      value: 'Very Strong',
      minDiversity: 4,
      minLength: 16
    }],
    characterLen: 'a',
    upperCase: 1,
    lowerCase: 1,
    num: 1,
    symbol: '#?!@$%^&*-'
  }); // Act

  const passwordResult = (0, _main.passwordValidation)('123Aa4@5@#!678'); // Assent

  await expect(passwordResult).toStrictEqual({
    success: false,
    message: ['characterLen must be type of number']
  });
});
test('password_valid_fail_senario_2', async () => {
  // Arrange
  (0, _main.setConfig)('password', {
    strengthOptions: [{
      value: 'Weak',
      minDiversity: 1,
      minLength: 12
    }, {
      value: 'Strong',
      minDiversity: 2,
      minLength: 14
    }, {
      value: 'Very Strong',
      minDiversity: 4,
      minLength: 16
    }],
    characterLen: 8,
    upperCase: 'a',
    lowerCase: 1,
    num: 1,
    symbol: '#?!@$%^&*-'
  }); // Act

  const passwordResult = (0, _main.passwordValidation)('123Aa4@5@#!678'); // Assent

  await expect(passwordResult).toStrictEqual({
    success: false,
    message: ['upperCase must be type of number']
  });
});
test('password_valid_fail_senario_3', async () => {
  // Arrange
  (0, _main.setConfig)('password', {
    strengthOptions: [{
      value: 'Weak',
      minDiversity: 1,
      minLength: 12
    }, {
      value: 'Strong',
      minDiversity: 2,
      minLength: 14
    }, {
      value: 'Very Strong',
      minDiversity: 4,
      minLength: 16
    }],
    characterLen: 8,
    upperCase: 1,
    lowerCase: '1',
    num: 1,
    symbol: '#?!@$%^&*-'
  }); // Act

  const passwordResult = (0, _main.passwordValidation)('123Aa4@5@#!678'); // Assent

  await expect(passwordResult).toStrictEqual({
    success: false,
    message: ['lowerCase must be type of number']
  });
});
test('password_valid_fail_senario_4', async () => {
  // Arrange
  (0, _main.setConfig)('password', {
    strengthOptions: [{
      value: 'Weak',
      minDiversity: 1,
      minLength: 12
    }, {
      value: 'Strong',
      minDiversity: 2,
      minLength: 14
    }, {
      value: 'Very Strong',
      minDiversity: 4,
      minLength: 16
    }],
    characterLen: 8,
    upperCase: 1,
    lowerCase: 1,
    num: 'a',
    symbol: '#?!@$%^&*-'
  }); // Act

  const passwordResult = (0, _main.passwordValidation)('123Aa4@5@#!678'); // Assent

  await expect(passwordResult).toStrictEqual({
    success: false,
    message: ['num must be type of number']
  });
});
test('password_valid_fail_senario_5', async () => {
  // Arrange
  (0, _main.setConfig)('password', {
    strengthOptions: [{
      value: 'Weak',
      minDiversity: 1,
      minLength: 12
    }, {
      value: 'Strong',
      minDiversity: 2,
      minLength: 14
    }, {
      value: 'Very Strong',
      minDiversity: 4,
      minLength: 16
    }],
    characterLen: 8,
    upperCase: 1,
    lowerCase: 1,
    num: 1,
    symbol: 1
  }); // Act

  const passwordResult = (0, _main.passwordValidation)('123Aa4@5@#!678'); // Assent

  await expect(passwordResult).toStrictEqual({
    success: false,
    message: ['symbol must be type of string']
  });
}); // Auccess scenario

test('ip_validation', async () => {
  await expect((0, _main.validateIPAddress)('10.0.0.36')).toStrictEqual({
    success: true,
    message: 'IP is valid'
  });
}); // Failed scenario - wrong input

test('ip_validation_fail', async () => {
  await expect((0, _main.validateIPAddress)(10)).toStrictEqual({
    success: false,
    message: 'IP is invalid'
  });
}); // Failed scenario - wrong ip

test('ip_validation_fail', async () => {
  await expect((0, _main.validateIPAddress)('10.0.0')).toStrictEqual({
    success: false,
    message: 'IP is invalid'
  });
});