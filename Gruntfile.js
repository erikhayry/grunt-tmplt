/*
 * grunt-tmplt
 * https://github.com/e.portin/grunt-tmplt
 *
 * Copyright (c) 2014 Erik Portin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Configuration to be run (and then tested).
        tmplt: {
            default_options: {
                src: ['test/assets/*.less', 'test/assets/**/*.js']
            },
            custom_options_1: {
                options: {
                    prefix: 'dist_'
                },

                files: [{
                    src: ['test/assets/*.less', 'test/assets/subFolder/*.js'],
                    dest: 'build/'
                }],
            },
            custom_options_2: {
                options: {
                    prefix: 'dist_'
                },

                files: [{
                    flatten: true,
                    src: ['test/assets/*.less', 'test/assets/subFolder/*.js'],
                    dest: 'build/'
                }],
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['jshint', 'tmplt', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint']);

};