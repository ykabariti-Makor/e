const utils = require('enigma-x-utilities')

test('url valid', async () => {
  utils.setConfig('URLValidator', {
    domainOnly: true,
    pathIncluded: false,
  })
  expect(utils.URLValidator('https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages')).toStrictEqual({
    success: true,
    message: 'Successfully modified URL',
    data: 'docs.npmjs.com',
  })
})

test("password valid",async ()=>{
  //arrange
  utils.setConfig("password",{
    strengthOptions: [
      {
        value: 'Weak',
        minDiversity: 1,
        minLength: 12,
      },

      {
        value: 'Strong',
        minDiversity: 2,
        minLength: 14,
      },

      {
        value: 'Very Strong',
        minDiversity: 4,
        minLength: 16,
      },
    ],

    characterLen: 12,
    upperCase: 1,
    lowerCase: 1,
    num: 1,
    symbol: '#?!@$%^&*-',
  },)
  //act
 const passwordResult = utils.passwordValidation("123Aa4@5@#!678")
//assent 
expect(passwordResult).toStrictEqual({
  validation: [
  { title: 'CharacterLen', valid: true, re: /^.{12,}$/ },
  { title: 'UpperCase', valid: true, re: /^(.*?[A-Z]){1,}/ },
  { title: 'LowerCase', valid: true, re: /^(.*?[a-z]){1,}/ },
  { title: 'Number', valid: true, re: /^(.*?[0-9]){1,}/ },
  {
  title: 'NonAlphaNumeric',
  valid: true,
  re: /^(.*?[#?!@$%^&*-,])/
  }
  ],
  strength: 'Strong'
  })
})
