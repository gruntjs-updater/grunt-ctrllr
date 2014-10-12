/*
 * grunt-ctrllr
 * https://github.com/CtrlLA/grunt-ctrllr
 *
 * Copyright (c) 2014 ishmaelthedestroyer
 * Licensed under the MIT license.
 */

'use strict';

var CTRLLR = require('ctrllr');
var path = require('path');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('ctrllr', 'Grunt task for running ctrllr API tests.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var done = this.async();

        var options = this.options({});

        if (typeof options.server === 'string') {
            options.server = require(path.resolve(__dirname + '/../' + options.server));
        }

        var c = new CTRLLR(options);

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                // Read file source, add to tests
                // var test = grunt.file.read(filepath);
                console.log('Adding test.', filepath);

                var test = require(path.resolve(__dirname + '/../' + filepath));
                c.add(test);
                return test;
            });
        });

        c.start();
    });
};
