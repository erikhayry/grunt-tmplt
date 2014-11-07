'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.tmplt = {
  setUp: function(done) {
    // setup here if necessary

    done();
  },

  default_options: function(test) {
    test.expect(1);

    var expected = 'var Model = function(){\n\tthis.height = 200;\n}';
    var actual = grunt.file.read('./test/assets/script.js');

    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
    grunt.file.delete('./test/assets/script.js');
    grunt.file.delete('./test/assets/subFolder/script.js');
  },

  prefixed: function(test) {
    test.expect(1);

    var expected = 'var Model = function(){\n\tthis.height = 200;\n}';
    var actual = grunt.file.read('./build/test/assets/subFolder/dist_script.js');

    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
    grunt.file.delete('./build/test/assets/subFolder/dist_script.js');
  },

  flattened: function(test) {
    test.expect(1);

    var expected = 'var Model = function(){\n\tthis.height = 200;\n}';
    var actual = grunt.file.read('./build/dist_script.js');

    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
    grunt.file.delete('./build/dist_script.js');
  }   
};
