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
