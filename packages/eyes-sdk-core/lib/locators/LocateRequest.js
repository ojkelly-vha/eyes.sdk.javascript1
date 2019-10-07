'use strict';

const { ArgumentGuard } = require('@applitools/eyes-common');

/**
 * Encapsulates data required to send a locate image request.
 */
class LocateRequest {
  /**
   * @param {string} imageUrl
   * @param {string[]} locatorNames
   * @param {string} appName
   * @param {boolean} [firstOnly=false]
   */
  constructor({ imageUrl, locatorNames, firstOnly, appName } = { }) {
    ArgumentGuard.notNullOrEmpty(imageUrl, 'imageUrl');
    ArgumentGuard.isArray(locatorNames, 'locatorNames');

    this._imageUrl = imageUrl;
    this._locatorNames = locatorNames;
    this._appName = appName;
    this._firstOnly = !!firstOnly;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getFirstOnly() {
    return this._firstOnly;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getImageUrl() {
    return this._imageUrl;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {strinig[]}
   */
  getLocatorNames() {
    return this._locatorNames;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {strinig}
   */
  getAppName() {
    return this._appName;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setFirstOnly(value) {
    this._firstOnly = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setAppName(value) {
    ArgumentGuard.notNullOrEmpty(value, 'appName');
    this._appName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setImageUrl(value) {
    ArgumentGuard.notNullOrEmpty(value, 'imageUrl');
    this._imageUrl = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string[]} value
   */
  setLocatorNames(value) {
    ArgumentGuard.notNullOrEmpty(value, 'locatorNames');
    this._locatorNames = value;
  }

  /**
   * @override
   */
  toJSON() {
    const object = {};
    if (this._firstOnly !== undefined) {
      object.firstOnly = this._firstOnly;
    }
    if (this._imageUrl !== undefined) {
      object.imageUrl = this._imageUrl;
    }
    if (this._locatorNames !== undefined) {
      object.locatorNames = this._locatorNames;
    }
    if (this._appName !== undefined) {
      object.appName = this._appName;
    }
    return object;
  }

  /**
   * @override
   */
  toString() {
    return `LocateRequest { ${JSON.stringify(this)} }`;
  }
}

exports.LocateRequest = LocateRequest;
