/*
 * grunt-tmplt
 * https://github.com/erikportin/grunt-tmplt
 *
 * Copyright (c) 2014 Erik Portin
 * Licensed under the MIT license.
 */

'use strict';
var _ = require('lodash');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('tmplt', 'Share data between files', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var src = [],
            options = this.options({
                ext: 'tmplt',
                tmpltsrc: '.tmpltsrc.json',
                prefix: ''
            }),
            data = grunt.file.readJSON(options.tmpltsrc);


        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            console.log(f);  
          
            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else if (filepath.indexOf('.' + options.ext + '.') === -1) {
                    return false;
                } else {
                    return true;
                }

            }).forEach(function(filepath) {
                // Read file source.
                var fileData = grunt.file.read(filepath);
                var newFilePath = filepath.replace('.' + options.ext, '');
                var newFileData = _.template(fileData, data);

                var indexOfFileName = filepath.lastIndexOf('/') + 1;
                var fileName = options.prefix + newFilePath.slice(indexOfFileName);
                var src = newFilePath.slice(0, indexOfFileName);
                var dest = (!f.dest || f.dest === 'src') ? '' : f.dest;

                if(f.flatten){
                  newFilePath = dest + fileName;                                    
                }
                else{
                  newFilePath = dest + src + fileName;
                }

                grunt.file.write(newFilePath, newFileData);
                grunt.log.writeln('File "' + newFilePath + '" created.');

            });
        });
    });
};