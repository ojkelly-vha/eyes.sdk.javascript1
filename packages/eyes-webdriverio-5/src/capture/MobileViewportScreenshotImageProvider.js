'use strict'

const {ImageProvider, MutableImage} = require('@applitools/eyes-sdk-core')
const WDIOJSExecutor = require('../WDIOJSExecutor')

class MobileViewportScreenshotImageProvider extends ImageProvider {
  /**
   * @param {Logger} logger A Logger instance.
   * @param {EyesWebDriver} tsInstance
   */
  constructor(logger, tsInstance) {
    super()
    this._logger = logger
    this._jsExecutor = new WDIOJSExecutor(tsInstance)
  }

  // Uses Appium hook available through the JS executor
  // http://appium.io/docs/en/commands/mobile-command/
  // Supported on iOS (XCUITest) and Android (UIAutomator2 only)
  /**
   * @override
   * @return {Promise.<MutableImage>}
   */
  async getImage() {
    this._logger.verbose('Getting screenshot as base64...')
    debugger
    let screenshot = await this._jsExecutor.executeScript('mobile: viewportScreenshot')
    // trimming line breaks since 3rd party grid provides can return them
    screenshot = screenshot.replace(/\r\n/g, '')

    this._logger.verbose('Done getting base64! Creating MutableImage...')
    const image = new MutableImage(screenshot)

    return image
  }
}

module.exports = MobileViewportScreenshotImageProvider
