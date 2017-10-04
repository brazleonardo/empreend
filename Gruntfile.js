module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
    
        cssmin: {
            target: {
                files: {
                    'dist/css/vendor.min.css': 'src/css/temp/vendor.css',
                    'dist/css/styles.min.css': 'src/css/temp/styles.css'
                }
            }
        },

        sass: {
            dist: {
              files: {
                'src/css/temp/styles.css': 'src/sass/styles.scss'
              }
            }
        },
 
        jshint: {
            jsFiles: ['Gruntfile.js', 'src/js/*.js', 'src/js/**/*.js']                             
        },
 
        concat: {
            css: {
                files: {'src/css/temp/vendor.css': 'src/css/vendor/*.css' }
            },
            js: {
                files: {
                    'src/js/temp/vendor.js': [
                        'src/js/vendor/angular.min.js',
                        'src/js/vendor/angular-sanitize.min.js',
                        'src/js/vendor/angular-route.min.js',
                        'src/js/vendor/angular-resource.min.js'
                    ],
                    'src/js/temp/app.js': [
                        'src/js/app/app.js', 
                        'src/js/app/appCtrl.js', 
                        'src/js/app/appSrv.js'
                    ]
                }
            }
        },
 
        uglify: {
            bundle: {
                files: {
                    'dist/js/vendor.min.js': 'src/js/temp/vendor.js',
                    'dist/js/app.min.js': 'src/js/temp/app.js'
                }
            }
        },

        copy: {
          main: {
            files: [
                {
                    expand: true,
                    cwd: 'src/css/fonts', 
                    src: [ '**', '!**/*.html', '!**/*.css', '!**/*.scss' ],
                    dest: 'dist/css/fonts'              
                }
            ]            
          }          
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'index.html': 'app/templates/layout.html'
                }
            },
            dev: {
                files: {
                    'index.html': 'app/templates/layout.html'
                }
            }
        },

        watch: {
            scripts: {
                files: 'src/js/**/*.js',
                tasks: ['concat', 'uglify:bundle'],
                options: {
                  nospawn: true,
                }              
            },
            css: {
                files: ['src/sass/*.scss', 'src/sass/partials/*.scss'],
                tasks: ['sass', 'concat', 'cssmin:target'],
                options: {
                  nospawn: true,
                }   
            },
            htmlmin: {
                files: 'app/templates/layout.html',
                tasks: ['htmlmin']
            }
        }
    });

    
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    grunt.registerTask('default', ['watch', 'htmlmin', 'cssmin:target', 'sass', 'jshint:jsFiles', 'concat:js', 'uglify:bundle', 'copy:main']);
};