
'use strict';

const Settings = {
  VISUAL_GRID_MAX_BUFFER_SIZE: 15.5 * 1024 * 1024, // 15.5 MB  (VG limit is 16MB)
  RESOURCE_UPLOAD_MAX_BUFFER_SIZE: 30 * 1024 * 1024, // a lot, limit is by server
};
Object.freeze(Settings);

module.export = Settings;
