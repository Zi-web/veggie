module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-css-mqpacker');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.initConfig({
		less: {
			style: {
				files: {
					"build/css/style.css":"less/style.less"
				}
			}
		},
		postcss: {
			options: {
				processors: [
					require('autoprefixer')({
						browsers: 
					[
						"last 1 version",
						"last 2 Chrome versions",
						"last 2 Firefox versions",
						"last 2 Opera versions",
						"last 2 Edge versions"
						]}),
					require('css-mqpacker')({
						sort: true 
					})
				]
		},
			style: {src: "build/css/*.css"}
		},
		watch: {
			html: {
				files: ["*.html"],
				tasks: ["copy:html"]
			}, 
			style: {
				files: ["less/**/*.less"],
				tasks: ["less", "postcss", "csso"]
			},
			js: {
				files: ["js/**/*.js"],
				tasks: ["copy:js"]
			}
		},
		browserSync: {
			server: {
				bsFiles: {
					src: ["build/*.html", "build/css/*.css"]
				},
				options: {
					server: "build",
					watchTask: true
					}
			}
		},
		csso: {
			style: {
				options: {
					report: "gzip" 
				},
				files: {
					"build/css/style.min.css": ["build/css/style.css"]
				}
			}
		},
		imagemin: {
			images: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					src: ["img/**/*.{png,jpg,gif}"]
				}]
			}
		},
		svgstore: {
			options: {
				svg: {
					style: "display: none"
				}
			},
			symbols: {
				files: {
					"build/img/symbols.svg": ["img/icons/*.svg"]
				}
			}
		},
		svgmin: {
			symbols: {
				files: [{
					expand: true,
					src: ["img/icons/*.svg"]
				}]
			}
		},
		copy: {
			build: {
				files: [{
					expand: true,
					src: [
						"fonts/**/*.{woff2, woff}",
						"img/**",
						"js/**",
						"*.html"
					],
					dest: "build"
				}]
			},
			html: {
				files: [{
					expand: true,
					src: ["*.html"],
					dest: "build"
				}]
			},
			js: {
				files: [{
					expand: true,
					src: ["js/**"],
					dest: "build"
				}]
			}
		},
		clean: {
			build: ["build"]
		}
	});
	grunt.registerTask("serve", ["browserSync", "watch"]);
	grunt.registerTask("symbols", ["svgmin", "svgstore"]);

	grunt.registerTask("build", [
		"clean",
		"copy",
		"less",
		"postcss",
		"csso",
		"symbols",
		"imagemin"
		]);
};