module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/*.js','src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    express: {
      options: {
      },
      run: {
        options: {
          script: './src/index.js'
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'src/*.html', 'src/**/*.html'],
      tasks: ['jshint', 'express'],
      options: {
        livereload: true,
        spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
      }
    }
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'express', 'watch']);

};