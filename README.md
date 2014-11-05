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

Run this task with the `grunt tmplt` command. The `src` property will use the Grunt glob pattern to specify files that should be included.

In your project's Gruntfile, add a section named `tmplt` to the data object passed into `grunt.initConfig()`.

```
grunt.initConfig({
  tmplt: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      src: []
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

### Src
Grunt glob pattern to specify files that should be included


### Usage Examples

Setup in grunt 

```
...

  tmplt: {
  	colors: {
    	options: {
    		//template data for any file specified in src
      		tmpltsrc: "globals/colours.json"
    	},
    	//will run tmplt on any *.tmplt.less and *.tmplt.js in the assets folder
    	src: ["assets/**/*.less", "assets/**/.js"]
  	}
  },
...
```

Store the data you want to share between files in `colours.json`


```
{
	"colorPrimary": "#222",
	"colorSecondary": "#fff"
}
```

Use the data in a javascript file name a file `nameOfJavascriptFile.tmplt.js`


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

Running the `tmplt task` will then create a javascript file called `nameOfJavascriptFile.js`

```
...

var colorPrimary = "#222";
var colorSecondary = "#fff";

...

```

and a less file `nameOfLessFile.less`

```
...

.button{
	color: #222;
	background-color: #fff;
}
...

``` 

###Use with watch

It makes sense to use the `tmplt` task togheter with a `watch` task.
The setup for using `tmplt` with [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) could look something like this:

```
...

watch: {
    configFiles: {
        files: ['Gruntfile.js'],
        options: {
            reload: true,
            spawn: true
        }
    },
    less: {
        files: ['**/*.less', '!**/*.tmplt.less'],
        tasks: ['less'],
        options: {
            livereload: true
        }
    },
    js: {
        files: ['assets/scripts/*.js', '!**/*.tmplt.js'],
        options: {
            livereload: true
        }
    },            
    tmpltLess: {
        files: ['assets/styles/**/*.tmplt.less', "globals/**/*.json"],
        tasks: ['tmplt']
    },
    tmpltJs: {
        files: ['assets/scripts/*.tmplt.js', "globals/**/*.json"],
        tasks: ['tmplt'] 
    }                        
},

...
```
Any changes to the data in the json file or a template file now will generate the js and less files automatically.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### v0.1.0
  - Initial release
