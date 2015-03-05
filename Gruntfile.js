/*jshint node:true*/

'use strict';

module.exports = function(grunt) {

  /**
   * Folder project names
   * @type {Object}
   */
  var config = {
    app: 'app',
    dist: 'dist'
  };

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  /**
   * Configuring grunt tasks
   */
  grunt.initConfig({

    // Project settings
    config: config,

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '{,*/}*.html',
            'fonts/{,*/}*.*'
          ]
        }]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 8000,
        hostname: 'localhost'
      },
      server: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 8001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static('test'),
              connect.static(config.app)
            ];
          }
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      compile: {
        options: {
          bundleExec: true,
          style: 'expanded'
        },
        files: {
          '.tmp/styles/main.css': '<%= config.app %>/styles/main.scss'
        }
      }
    },

    cssmin: {
      compile: {
        files: {
          '<%= config.dist %>/styles/main.css': [
            '.tmp/styles/main.css',
            'bower_components/normalize-css/normalize.css'
          ]
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      compile: {
        src: '.tmp/styles/main.css',
        dest: '.tmp/styles/main.css'
      }
    },

    // Testing with Mocha and Phantom JS
    'mocha_phantomjs': {
      all: {
        options: {
          urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: './.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        'test/specs/{,*/}*.js'
      ]
    },

    // Require js
    requirejs: {
      options: {
        preserveLicenseComments: false,
        useStrict: true,
        wrap: false
      },
      compile: {
        options: {
          baseUrl: '<%= config.app %>/scripts',
          mainConfigFile: '<%= config.app %>/scripts/main.js',
          include: 'main',
          name: '../../bower_components/almond/almond',
          out: '<%= config.dist %>/scripts/main.js'
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          // true would impact styles with attribute selectors
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          // src: [
          //   '<%= config.dist %>/scripts/{,*/}*.js',
          //   '<%= config.dist %>/styles/{,*/}*.css',
          //   '<%= config.dist %>/images/{,*/}*.*',
          //   '<%= config.dist %>/styles/fonts/{,*/}*.*',
          //   '<%= config.dist %>/*.{ico,png}'
          // ]
          src: ['<%= config.dist %>/**/*.{js,css,png,jpg}']
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      scripts: {
        files: '<%= jshint.all %>',
        tasks: ['jshint']
      },
      styles: {
        files: '<%= config.app %>/styles/{,*/}*.scss',
        tasks: ['sass', 'autoprefixer']
      }
    },

    // gh-pages for deploy
    'gh-pages': {
      options: {
        base: '<%= config.dist %>'
      },
      src: ['**']
    }

  });

  /**
   * Use this task for run javascript test and code quality
   * command: grunt
   */
  grunt.registerTask('test', [
    'jshint',
    'connect:test',
    'mocha_phantomjs'
  ]);

  /**
   * Use this task for development
   * command: grunt
   */
  grunt.registerTask('default', [
    'clean:server',
    'sass'
  ]);

  /**
   * Create local server, useful to develop
   */
  grunt.registerTask('serve', [
    'default',
    'connect:server',
    'watch'
  ]);

  /**
   * Create local server to test only
   */
  grunt.registerTask('test_serve', [
    'test',
    'watch'
  ]);

  /**
   * Build and create dist folder, useful for test before deploy
   * command: grunt build
   */
  grunt.registerTask('build', [
    'clean:dist',
    'test',
    'useminPrepare',
    'requirejs',
    'sass',
    'autoprefixer',
    'imagemin',
    'svgmin',
    'copy:dist',
    'concat:generated',
    'cssmin:compile',
    'usemin',
    'htmlmin'
  ]);

  /**
   * Deploy with gh-pages
   * command: grunt deploy
   */
  grunt.registerTask('deploy', ['build', 'gh-pages']);

};
