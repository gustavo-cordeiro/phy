module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: '9000',
                    base: './'
                },
                open: {
                    target: 'http://localhost:9000/app/index.html'
                }
            }
        },
        watch: {
            css: {
                files: [
                    'app/**/*.css'
                ],
                options: {
                    livereload: true,
                }
            },
            js: {
                files: [
                    'app/**/*.js'
                ],
                tasks: [],
                options: {
                    livereload: true,
                }
            },
            views: {
                files: [
                    'app/index.html'
                ],
                options: {
                    livereload: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'connect',
        'watch'
    ]);
};