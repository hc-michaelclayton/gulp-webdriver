"use strict";

var _through = _interopRequireDefault(require("through2"));

var _resolve = _interopRequireDefault(require("resolve"));

var _path = _interopRequireDefault(require("path"));

var _pluginError = _interopRequireDefault(require("plugin-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (options) {
  return _through.default.obj(function (file, encoding, callback) {
    var stream = this;

    var Launcher = require(_path.default.join(_path.default.dirname(_resolve.default.sync('@wdio/cli')), 'launcher')).default;

    var wdio = new Launcher(file.path, options);
    wdio.run().then(function (code) {
      process.stdin.pause();

      if (code !== 0) {
        process.nextTick(function () {
          return stream.emit('error', new _pluginError.default('gulp-webdriver', "wdio exited with code ".concat(code), {
            showStack: false
          }));
        });
      }

      callback();
      process.nextTick(function () {
        return stream.emit('end');
      });
    }, function (e) {
      process.stdin.pause();
      process.nextTick(function () {
        return stream.emit('error', new _pluginError.default('gulp-webdriver', e, {
          showStack: true
        }));
      });
    });
    return stream;
  });
};