# grunt-tmplt

Share values between different file types.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tmplt --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```
grunt.loadNpmTasks('grunt-tmplt');
```

## The "tmplt" task

### Overview
In your project's Gruntfile, add a section named `tmplt` to the data object passed into `grunt.initConfig()`.

```
grunt.initConfig({
  tmplt: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.ext
Type: `String`
Default value: `'tmplt'`

File extension that is used to find your template files. To template a javascript file you'll then name it `nameOfJavascriptFile.tmplt.js`, a less file `nameOfLessFile.tmplt.less` and so on.

#### options.tmpltsrc
Type: `String`
Default value: `'.tmpltsrc.json'`

JSON source file for your templating data

### Usage Examples

Store the data you want to share between files in `.tmpltsrc.json` like this:


```
{
	"colorPrimary": "#222",
	"colorSecondary": "#fff"
}
```

To use the data in a javascript file name the file `nameOfJavascriptFile.tmplt.js` and insert the data like this:


```
...

var colorPrimary = "<%= colorPrimary %>";
var colorSecondary = "<%= colorSecondary %>";

...
```

and then in a less file called `nameOfLessFile.tmplt.less`

```
...

.button{
	color: <%= colorPrimary %>;
	background-color: <%= colorSecondary %>;
}
...
```

Running the `tmplt task` will then create a javascript file called `nameOfJavascriptFile.js` looking like this:

```
...

var colorPrimary = "#222";
var colorSecondary = "#fff";

...
```

and a less file `nameOfLessFile.less` looking like this:

```
...

.button{
	color: #222;
	background-color: #333;
}
...
``` 


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).