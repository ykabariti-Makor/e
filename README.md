# Enigma X Utilities [![NPM version][npm-image]][npm-url] [![Coverage Status](https://coveralls.io/repos/github/rmartone/missionlog/badge.svg?branch=master)](https://coveralls.io/github/rmartone/missionlog?branch=master) [![Bundlephobia](https://badgen.net/bundlephobia/minzip/missionlog)](https://bundlephobia.com/result?p=missionlog)

[npm-image]: https://img.shields.io/npm/v/missionlog.svg?style=flat
[npm-url]: https://www.npmjs.com/package/missionlog

## Features

-   URL validator: Check URL validaity & domain/path formatter
-   Tags separator: Separate tags
-   Password strength/validator: Check for password strength & validity
-   Number modifier: Modify number
-   Phone number modifier: Modify phone number
-   Number positivity checker: Check if number is negative or positive
-   IP address validation: Validate IP
-   Remove spaces: Remove spaces 
-   Email domain checker: Check email domain
-   Special chars removal: Remove special chars from
-   Handle errors with success status & detailed message

## Install

```shell
npm i enigma-x-utilities
```

## Configuration

Configuration is optional, you can use most of the functions as they are, every optional option has default value.
But if you would like to modifiy the values use the `setConfig` function.

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

# Check number positivity

Feature for checking number positivity, checks number value.
Return boolean

```javascript
const { checkNumberPositivity, setConfig } = require('enigma-x-utilities');

// Config Default values
setConfig('checkNumberPositivity', {
	zeroIncluded: false,
});
```

### Success

```javascript
// Checking number positivity
checkNumberPositivity(1)

// Output
{
  success: true,
  message: 'successfully processed number',
  data: true,
}
```

### Error

```javascript
// Checking number positivity
checkNumberPositivity('blbalbla')

// Output
{ success: false, message: 'blbalbla' should be type number }
```

# Number Formatter

Feature for formatting number according to overall and decimal digits count limit.

```javascript
const { numberFormatter, setConfig } = require('enigma-x-utilities');

// Config Default values
setConfig('numberFormatter', {
	overallDigitLimit: 5,
	decimalDigitLimit: 2,
	useColors: true,
	colors: {
		positive: 'green',
		negative: 'red',
	},
});
```

### Success

```javascript

numberFormatter(123456.1)

// Output

{
  success: true,
  message: 'Successfully formatted number',
  data: {
    number: '123.45K',
    color : 'green'
  }
}
```

### Error

```javascript

numberFormatter('asd')

// Output
{ success: false, message: 'Input is not a valid number' }
```

# URL Validator

Feature for validating & formatting URL, check if URL is valid & format the URL.
Return formatted URL.

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

Feature for sepataring tags, Receives string and splits it into an array. Optionaly you can config the separators passing an array of chars to the config function.
Return sepatarted tags array.

```javascript
const { tagsSeparator, setConfig } = require('enigma-x-utilities');

//Config default values
setConfig('tags', {
	separators: undefined,
});
```

```javascript
setConfig('tags', {
	separators: ['$', '^', '&'],
});
```

## Description

-   If no array of separators is passed, the function will decide what should be treated as the separator by looking for all the \*special
    characters in the string and taking the most frequent one as the separator (if there are a couple of separators equally
    frequent at the top - the one that shows up first in the string is selected).

-   If the array contains only one item, the function treats it as the separtor and splits the string into tags according to it.

-   If the array contains more than one item, the array is treated as optional allowed separators.
    The actual separator will be the option that shows up most frequently in the passed string.

-   The array of separators may only contain \*special characters. Each separator should consist of one character only.

\*Special characters: any character that is not a-z, A-Z,0-9, \_

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
const { passwordValidation, setConfig } = require('enigma-x-utilities');

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
})
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

# Phone number validator

Feature for international phone number validation ,check if the phone number is valid based on the input, And reformat the phone number by user configuration.

```javascript
const { phoneNumberFormatter, setConfig } = require('enigma-x-utilities');

// Config Default values
setConfig('phones', {
	format: '3-3-3-4',
	isInternational: true,
});
```

### Success

```javascript
// Validating & formatting phone number
phoneNumberFormatter('255-777-4708834')

// Output
{
  success: true,
  message: 'Phone number successfully formatted',
  data: '255-777-470-8834'
}
```

### Error

```javascript
// Validating & formatting phone number
phoneNumberFormatter('255-777-470')

// Output
{ success: false, message: 'Format does not match the number of digits in phone number' }
```

# Special chars modifier

#### configuration

```javascript
const { specialCharsModifier, setConfig } = require('enigma-x-utilities');

//you can call the function without configuration it . and then all the special chars in your string will be deleted.
//You can config this function to filter which chars you want to still appear.

setConfig('special chars', '@');
```

#### SUCCESS

```javascript
specialCharsModifier('12#$3%4567');
//Output
{success:true,
message:"String modify successfully
data:string
}
```

#### Error

```javascript
specialCharsModifier(123$4%^&)
//Output
{success:false,message:"123$4%^& must be a string"}
```

# Ip validation

#### Configuration

```javascript
const { ipValidation } = require('enigma-x-utilities');
```

#### SUCCESS

```javascript
ipValidation('130.75.164.95');
//Output
{success:true,message:ip is valid}
```

#### Error

```javascript
ipValidation('130.75.164');
//Output
{success:false,message:ip is not valid}
```

# Email domain validator

Feature for testing if inserted email input is contained inside a list of approved domains.

```javascript
const { emailDomainValidator, setConfig } = require('enigma-x-utilities');

// Config Default values
setConfig('emailDomainValidator', {
	domainList: ['gmail.com', 'yahoo.com', 'blabla.co.il'],
});
```

### Success

```javascript
// Validating email input
emailDomainValidator('eli@yahoo.com')

// Output
{
  success: true,
  message: 'Email inserted is valid',
  data: true
  }
```

### Error

```javascript
// Validating email outside list of domains
emailDomainValidator('eli@capital.com')

// Output
{ success: false, message: 'Email inserted is not in domain list' }
```

# Space Remover

Feature for removing unneeded whitespace from text. Receives a string and returns a string.

```javascript
const { removeSpaces  } = require('enigma-x-utilities');
```

## Description

-   removeSpaces removes whitespace of any sort before and after text; removes more than one whitespace between words and
    any whitespace between words and punctuation marks.



### Success

```javascript
// Removing unneeded spaces
removeSpaces('user      sends empty separators array, string is split according to most frequent char')

// Output
{
  success: true,
  message: 'Spaces removed successfully',
  data: 'user sends empty separators array, string is split according to most frequent char'
}
```

## Resources

codeSandbox - https://codesandbox.io/s/dry-sky-dfi7x
