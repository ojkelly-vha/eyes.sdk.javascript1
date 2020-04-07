'use strict'

const {
  GetFloatingRegion,
  FloatingMatchSettings,
  Location,
  CoordinatesType,
} = require('@applitools/eyes-sdk-core')
const EyesWDIOUtils = require('../EyesWDIOUtils')

class FloatingRegionBySelector extends GetFloatingRegion {
  /**
   * @param {By} regionSelector
   * @param {int} maxUpOffset
   * @param {int} maxDownOffset
   * @param {int} maxLeftOffset
   * @param {int} maxRightOffset
   */
  constructor(regionSelector, maxUpOffset, maxDownOffset, maxLeftOffset, maxRightOffset) {
    super()
    this._selector = regionSelector
    this._maxUpOffset = maxUpOffset
    this._maxDownOffset = maxDownOffset
    this._maxLeftOffset = maxLeftOffset
    this._maxRightOffset = maxRightOffset
  }

  /**
   * @override
   * @param {Eyes} eyesBase
   * @param {EyesScreenshot} screenshot
   */
  async getRegion(eyesBase, screenshot) {
    const elements = await eyesBase.getDriver().elements(this._selector)

    const values = []
    if (elements && elements.length > 0) {
      for (let i = 0; i < elements.length; i += 1) {
        const point = await elements[i].getLocation()
        const size = await elements[i].getSize()
        const lTag = screenshot.convertLocation(
          new Location(point),
          CoordinatesType.CONTEXT_RELATIVE,
          CoordinatesType.SCREENSHOT_AS_IS,
        )
        const floatingRegion = new FloatingMatchSettings({
          left: lTag.getX(),
          top: lTag.getY(),
          width: size.getWidth(),
          height: size.getHeight(),
          maxUpOffset: this._maxUpOffset,
          maxDownOffset: this._maxDownOffset,
          maxLeftOffset: this._maxLeftOffset,
          maxRightOffset: this._maxRightOffset,
        })
        values.push(floatingRegion)
      }
    }

    return values
  }

  async toPersistedRegions(driver) {
    const regions = await EyesWDIOUtils.locatorToPersistedRegions(this._selector, driver)
    return regions.map(reg => ({
      ...reg,
      maxUpOffset: this._maxUpOffset,
      maxDownOffset: this._maxDownOffset,
      maxLeftOffset: this._maxLeftOffset,
      maxRightOffset: this._maxRightOffset,
    }))
  }
}

module.exports = FloatingRegionBySelector
