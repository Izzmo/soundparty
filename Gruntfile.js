module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    copy: {
      build: {
        cwd: '.',
        src: [ '**', '!**/scss/**', '!node_modules/**', '!uploads/**', '!nbproject/**', '!.git/**' ],
        dot: true,
        dest: 'build',
        expand: true
      }
    },
    
    clean: {
      build: {
        src: [ 'build' ]
      },
      finish: {
        src: [ 'build/package.json', 'build/.bowerrc', 'build/.gitignore', 'build/bower.json', 'build/Gruntfile.js', 'build/build.txt' ],
        dot: true
      }
    },
    
    rename: {
      htaccess: {
        src: 'build/.htaccess.prod',
        dest: 'build/.htaccess'
      },
      vars: {
        src: 'build/application/vars.php.prod',
        dest: 'build/application/vars.php'
      },
      CmsHtaccess: {
        src: 'build/cms/.htaccess.prod',
        dest: 'build/cms/.htaccess'
      },
      CmsVars: {
        src: 'build/cms/application/vars.php.prod',
        dest: 'build/cms/application/vars.php'
      }
    },
    
    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.css' ],
        dest: '.'
      }
    },
    
    sass: {
      options: {
        includePaths: ['public/vendor/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourcemap: 'auto'
        },
        files: {
          'public/css/app.css': 'public/scss/app.scss',
          'public/css/main.css': 'public/scss/main.scss'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-rename');

  grunt.registerTask('deploy', ['clean:build', 'copy', 'clean:finish', 'rename']);
  grunt.registerTask('default', [ ]);
}