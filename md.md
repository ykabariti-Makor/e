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
const { setConfig } = require('enigma-x-utilities')

/**
 * setConfig for configuration
 * @param {configName} string function to config
 * @param {parameters} object fields to config
 * @returns void
 */
setConfig('phones', {
  format: '10',
  isInternational: true,
})
```

## Usage

# URL Validator

```javascript
const { URLValidator } = require('enigma-x-utilities')

// Validating & formatting URL
URLValidator('https://github.com/daniel-bar')

// the imported value "tag" is populated with YOUR tags!
log.error(tag.security, 'not authorized', statusCode)

// but if you prefer simply use strings
log.warn('transporter', 'Evil twin detected!')

// filtered since security's log level ERROR is greater than INFO
log.info(tag.security, 'login successful')

// also filtered since system's level is OFF
log.error(tag.system, 'eject the warp core', error)

// updates tag levels on the fly
log.init({ loader: 'ERROR', system: 'INFO' })

// disable logging by clearing the callback
log.init()
```
