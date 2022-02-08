# Enigma X Utilities [![NPM version][npm-image]][npm-url] [![Coverage Status](https://coveralls.io/repos/github/rmartone/missionlog/badge.svg?branch=master)](https://coveralls.io/github/rmartone/missionlog?branch=master) [![Bundlephobia](https://badgen.net/bundlephobia/minzip/missionlog)](https://bundlephobia.com/result?p=missionlog)

[npm-image]: https://img.shields.io/npm/v/missionlog.svg?style=flat
[npm-url]: https://www.npmjs.com/package/missionlog

## Features

- URL validator: Check URL validaity & domain/path formatter
- Tags separator: Separate tags
- Password strength/validator: Check for password strength & validity
- Number modifier: Modify number
- Phone number modifier: Modify phone number
- Handle errors with success status & detailed message

## Install

```shell
npm i enigma-x-validator
```

## Configuration

Configuration is optional, you can use most of the functions as they are, every optional option has default value.
But if you would like to modifiy the values you can use `setConfig` function.

```javascript
const { setConfig } = require('enigma-x-utilities');

/**
 * setConfig for configuration
 * @param {configName} string function to config
 * @param {parameters} object fields to config
 * @returns void
 */
setConfig('phones', {
  format: '10',
  isInternational: true,
});
```

## Usage

# URL Validator

```javascript
const { URLValidator, setConfig } = require('enigma-x-utilities');

// Config Default values
setConfig('URLValidator', {
  domainName: false,
  pathIncluded: true,
});
```

### Success

```javascript
// Validating & formatting URL
URLValidator('https://www.youtube.com/watch?v=OLK49ZTbmWM&list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK&index=5')

// Output
{
  success: true,
  message: 'Successfully modified URL',
  data: 'https://www.youtube.com/watch?v=OLK49ZTbmWM&list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK&index=5'
}
```

### Error

```javascript
// Validating & formatting URL
URLValidator('blablablablo')

// Output
{ success: false, message: 'URL is invalid' }
```

# Tags Separator

```javascript
const { tagsSeparator } = require('enigma-x-utilities');
```
### Description
The function receives a string and splits it into an array of separate tags.

The first argument is the string to be splitted.

The second argument, which is optional, is an array of separators(e.g. ["*", " ", "," ]).

- If no array of separators is passed, the function will decide what should be treated as the separator by looking for all the *special 
characters in the string and taking the most frequent one as the separator (if there are a couple of separators equally 
frequent at the top - the one that shows up first in the string is selected).

- If the array contains only one item, the function treats it as the separtor and splits the string into tags according to it.

- If the array contains more than one item, the array is treated as optional allowed separators. 
The actual separator will be the option that shows up most frequently in the passed string.

- The array of separators may only contain *special characters; otherwise, an error is thrown.

*Special characters: any character that is not a-z, A-Z,0-9, _

### Success

```javascript
// Separating tags
tagsSeparator('Sun Earth Mars', [" ", ","])

// Output
{
  success: true,
  message: 'Tags array created successfully',
  data: ['Sun','Earth','Mars']
}
```

### Error

```javascript

tagsSeparator('Sun Earth Mars', ["--"])

// Output
{
  success: false,
  message: 'Separators may only include one character each',
}
```

# Password Validation

Feature for password validation ,check if password is valid based on configuration, and the strength of it.
Return object after validation is succeed.

#### configuration

```javascript
const { setConfig } = require('./config');
const { passwordValidation } = require('./utils/auth');

//Config default values
setConfig('password', {
  strengthOptions: [
    {
      value: 1,
      minDiversity: 1,
      minLength: 8,
    },

    {
      value: 'Medium',
      minDiversity: 3,
      minLength: 10,
    },

    {
      value: 'Strong',
      minDiversity: 4,
      minLength: 12,
    },
  ],

  characterLen: 12,
  upperCase: 1,
  lowerCase: 1,
  num: 1,
  symbol: '#?!@$%^&*-',
});
```

#### Success

```javascript
//Validating the password.
passwordValidation("112412$@Aa")

//Output

{
  validation: [
    { title: 'Char', valid: true, re: /^.{12,}$/ },
    { title: 'UpperCase', valid: true, re: /^(.*?[A-Z]){1,}/ },
    { title: 'LowerCase', valid: true, re: /^(.*?[a-z]){1,}/ },
    { title: 'Number', valid: true, re: /^(.*?[0-9]){1,}/ },
    {
      title: 'NonAlphaNumeric',
      valid: true,
      re: /^(.*?[#?!@$%^&*-,])/
    }
  ],
  strength:"Weak"
}
```

#### Error

```javascript
//Error will happend if one of the value's of the default value is incorrect.
{
  validation: [
    { title: 'Char', valid: true, re: /^.{12,}$/ },
    { title: 'UpperCase', valid: true, re: /^(.*?[A-Z]){1,}/ },
    { title: 'LowerCase', valid: true, re: /^(.*?[a-z]){1,}/ },
    { title: 'Number', valid: true, re: /^(.*?[0-9]){1,}/ },
    {
      title: 'NonAlphaNumeric',
      valid: true,
      re: /^(.*?[#?!@$%^&*-,])/
    }
  ],
  //this Error happend when the default value at the strength config set to argument that not string.
  strength: { success: false, message: [ 'value must be type of string' ] }
}
```
