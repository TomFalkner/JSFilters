module.exports = function(grunt) {


    grunt.initConfig({
        mkdir: {
            all: {
                options: {
                    create: ['build']
                }
            }
        },
        clean: {
            build: ['build'],
            visual: ['test/visual/build'],
            all: ['build']
        },
        concat: {
            options: {
                separator: '\n'
            },
            build: {
                src: ['src/**/*.js'],
                dest: 'build/jsfilters.js'
            }
        },
        copy: {
            visual: {
                expand: 'true',
                src: ['build/jsfilters.js'],
                dest: 'test/visual/'
            }
        }

    });

    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['clean:build', 'mkdir', 'concat:build']);
    grunt.registerTask('test-visual', ['clean:visual', 'build', 'copy:visual']);
    grunt.registerTask('clean-all', ['clean:all']);

};