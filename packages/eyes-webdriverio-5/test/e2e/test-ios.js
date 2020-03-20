'use strict'

const {Eyes, ConsoleLogHandler, Target} = require('../..')
const {remote} = require('webdriverio')

describe('wdio5 native app', function() {
  let eyes
  let browser

  before(function() {
    eyes = new Eyes()
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY)
    eyes.setLogHandler(new ConsoleLogHandler(true))
  })

  beforeEach(async () => {
    const browserOptions = {
      host: 'ondemand.saucelabs.com',
      hostname: 'ondemand.saucelabs.com',
      port: 80,
      path: '/wd/hub',
      capabilities: {
        appiumVersion: '1.16.0',
        automationName: 'XCUITest',
        platformName: 'iOS',
        platformVersion: '13.2',
        deviceName: 'iPhone 11 Simulator',
        app: 'https://applitools.bintray.com/Examples/HelloWorldiOS_1_0.zip',
        newCommandTimeout: 600,
        username: process.env.SAUCE_USERNAME,
        accesskey: process.env.SAUCE_ACCESS_KEY,
        baseUrl: `http://${process.env.SAUCE_USERNAME}:${process.env.SAUCE_ACCESS_KEY}@ondemand.saucelabs.com:80/wd/hub`,
      },
    }

    browser = await remote(browserOptions)
    return eyes.open(browser, 'iOS Example', 'wdio5 trello 229')
  })

  afterEach(async () => {
    await eyes.abortIfNotClosed()
    await browser.deleteSession()
  })

  it('TestCheckWindow', async () => {
    await eyes.check('check', Target.window())
    await eyes.close(true)
  })
})
