'use strict'

const {BrowserNames} = require('@applitools/eyes-sdk-core')
const TakesScreenshotImageProvider = require('./TakesScreenshotImageProvider')
const FirefoxScreenshotImageProvider = require('./FirefoxScreenshotImageProvider')
const SafariScreenshotImageProvider = require('./SafariScreenshotImageProvider')
const MobileViewportScreenshotImageProvider = require('./MobileViewportScreenshotImageProvider')
const EyesWDIOUtils = require('../EyesWDIOUtils')

class ImageProviderFactory {
  /**
   * @param {UserAgent} userAgent
   * @param {Eyes|EyesWDIO} eyes
   * @param {Logger} logger
   * @param {EyesWebDriver} driver
   * @return {ImageProvider}
   */
  static getImageProvider(userAgent, eyes, logger, driver) {
    if (userAgent) {
      if (userAgent.getBrowser() === BrowserNames.Firefox) {
        try {
          if (parseInt(userAgent.getBrowserMajorVersion(), 10) >= 48) {
            return new FirefoxScreenshotImageProvider(eyes, logger, driver)
          }
        } catch (ignored) {
          return new TakesScreenshotImageProvider(logger, driver)
        }
      } else if (userAgent.getBrowser() === BrowserNames.Safari) {
        return new SafariScreenshotImageProvider(eyes, logger, driver, userAgent)
      }
    }
    if (
      process.env.APPLITOOLS_MOBILE_VIEWPORT &&
      EyesWDIOUtils.isMobileDevice(driver.remoteWebDriver)
      // TODO: check is Appium
      // TODO: check is either UIAutomator2 or iOS
    ) {
      return new MobileViewportScreenshotImageProvider(logger, driver)
    }
    return new TakesScreenshotImageProvider(logger, driver)
  }
}

module.exports = ImageProviderFactory
