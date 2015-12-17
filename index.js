'use strict';

var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var mime = require('mime-types')
var bce = require('baidubce-sdk');

const PLUGIN_NAME = 'gulp-bos';

module.exports = function (options) {
    function createClient(options) {
        options = options || {};

        if (!options.bucket) {
            throw new gutil.PluginError(PLUGIN_NAME, 'You must specify a bucket.');
        }

        options.prefix = options.prefix || '';

        return new bce.BosClient(options);
    }

    function transform(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return callback(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        var key = path.join(options.prefix, file.relative);
        var header = {
            'Content-Type': mime.lookup(file.path) || 'application/octet-stream'
        };

        client.putObjectFromString(options.bucket, key, file.contents.toString(), header)
            .then(function () {
                gutil.log(gutil.colors.cyan(key), 'uploaded');
                callback(null, file);
            }).catch(function (error) {
                callback(new gutil.PluginError(PLUGIN_NAME, error), file);
            });

    }


    var client = createClient(options);
    return through.obj(transform);
};
