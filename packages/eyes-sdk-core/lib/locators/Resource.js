'use strict';

const { GeneralUtils, ArgumentGuard } = require('@applitools/eyes-common');
const { RESOURCE_UPLOAD_MAX_BUFFER_SIZE } = require('../Settings');

class Resource {
  /**
   * @param {Buffer} content
   */
  constructor(content) {
    ArgumentGuard.notNullOrEmpty(content, 'content');
    this._content = content;
  }

  /**
   * @return {Buffer} - The content of the current resource.
   */
  getContent() {
    return this._content;
  }

  /**
   * @param {Buffer} value - The resource's content
   */
  setContent(value) {
    ArgumentGuard.notNull(value, 'content');
    this._content = value;

    if (value.length > RESOURCE_UPLOAD_MAX_BUFFER_SIZE) {
      this._content = value.slice(0, RESOURCE_UPLOAD_MAX_BUFFER_SIZE - 100000);
    }
  }

  /**
   * @override
   */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /**
   * @override
   */
  toString() {
    return `Resource { ${JSON.stringify(this)} }`;
  }
}

exports.Resource = Resource;
