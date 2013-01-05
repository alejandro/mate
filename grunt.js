  /*global module:false*/
  module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-css')
    // Project configuration.
    grunt.initConfig({
      pkg: '<json:package.json>',
      meta: {
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
      },
      lint: {
        files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
      },
      qunit: {
        files: ['test/**/*.html']
      },
      concat: {
        dist: {
          src: [
            '<banner:meta.banner>',
            'public/components/quojs/quo.js',
            'public/components/lungo/lungo.js',
            'public/javascripts/define.js',
            'public/javascripts/app.helpers.js',
            'public/javascripts/app.ui.js',
            'public/javascripts/app.js'
          ],
          dest: 'public/build/<%= pkg.name %>.js'
        },
        css: {
          src:  [
            'public/components/lungo/lungo.css',
            'public/components/lungo/lungo.icon.css',
            'public/components/lungo/lungo.icon.brand.css',
            'public/components/lungo/lungo.theme.default.css',
            'public/stylesheets/style.css',
          ],
          dest: 'public/build/<%= pkg.name %>.css'
        }
      },
      min: {
        dist: {
          src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
          dest: 'public/build/<%= pkg.name %>.min.js'
        }
      },
      cssmin:{
        dist: {
            src: ['<banner:meta.banner>', '<config:concat.css.dest>'],
            dest: 'public/build/<%= pkg.name %>.min.css'
        }
      },
      watch: {
        files: ['public/**/**'],
        tasks: 'concat min cssmin'
      },
      jshint: {
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          boss: true,
          eqnull: true,
          browser: true
        },
        globals: {
          jQuery: true
        }
      },
      uglify: {}
    });
    
    // Default task.
    grunt.registerTask('default', 'concat min cssmin');

  };
