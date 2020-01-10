const gulp = require( 'gulp' );
const fs = require( 'fs' );
const $ = require( 'gulp-load-plugins' )();
const mozjpeg = require( 'imagemin-mozjpeg' );
const pngquant = require( 'imagemin-pngquant' );
const mergeStream = require( 'merge-stream' );
const named = require( 'vinyl-named' );
const webpack = require( 'webpack-stream' );
const webpackBundle = require( 'webpack' );

// Include Path for Scss
const includesPaths = [
	'assets/scss'
];

// Source directory
const srcDir = {
	scss: [
		'assets/scss/**/*.scss',
	],
	js: [
		'assets/js/**/*.js',
		'!assets/js/**/_*.js',
	],
	jsHint: [
		'assets/js/**/*.js',
	],
	img: [
		'assets/img/**/*',
	],
};

// Destination directory
const destDir = {
	scss: 'dist/css',
	js: 'dist/js',
	img: 'dist/img',
};

//
// SCSS tasks
// ================
//

// Lint SCSS
gulp.task( 'scss:lint', function( done ) {
	return gulp.src( './assets/scss/**/*.scss' )
		.pipe( $.stylelint( {
			failAfterError: false,
			reporters: [
				{
					formatter: 'string',
					console: true,
				},
			],
		} ) );
} );

gulp.task( 'scss:generate', function() {
	return gulp.src( srcDir.scss )
		.pipe( $.plumber( {
			errorHandler: $.notify.onError( '<%= error.message %>' )
		} ) )
		.pipe( $.sassGlob() )
		.pipe( $.sourcemaps.init() )
		.pipe( $.sass( {
			errLogToConsole: true,
			outputStyle: 'compressed',
			sourceComments: 'normal',
			sourcemap: true,
			includePaths: includesPaths,
		} ) )
		.pipe( $.autoprefixer() )
		.pipe( $.sourcemaps.write( './map' ) )
		.pipe( gulp.dest( destDir.scss ) );
} );

gulp.task( 'scss', gulp.parallel( 'scss:generate', 'scss:lint' ) );

//
// Javascripts
// ===================
//
gulp.task( 'js:compile', function() {
	const tmp = {};
	return gulp.src( [
		'./assets/js/**/*.js',
	] )
		.pipe( $.plumber( {
			errorHandler: $.notify.onError( '<%= error.message %>' ),
		} ) )
		.pipe( named() )
		.pipe( $.rename( function( path ) {
			tmp[ path.basename ] = path.dirname;
		} ) )
		.pipe( webpack( require( './webpack.config.js' ), webpackBundle ) )
		.pipe( $.rename( function( path ) {
			if ( tmp[ path.basename ] ) {
				path.dirname = tmp[ path.basename ];
			} else if ( '.map' === path.extname && tmp[ path.basename.replace( /\.js$/, '' ) ] ) {
				path.dirname = tmp[ path.basename.replace( /\.js$/, '' ) ];
			}
			return path;
		} ) )
		.pipe( gulp.dest( './dist/js/' ) );
} );

// ESLint
gulp.task( 'js:eslint', function() {
	return gulp.src( [
		'assets/js/**/*.js',
		'assets/js/**/*.jsx',
	] )
		.pipe( $.eslint( { useEslintrc: true } ) )
		.pipe( $.eslint.format() );
} );

// JS task
gulp.task( 'js', gulp.parallel( 'js:eslint', 'js:compile' ) );

//
// Build Libraries.
// ===============
//
gulp.task( 'copy', function() {
	// pass gulp tasks to event stream.
	// return mergeStream(
	// );
} );

//
// Image min
// ===============
//

// SVG Minify and copy
gulp.task( 'imagemin:svg', function() {
	return gulp.src( './assets/img/**/*.svg' )
		.pipe( $.svgmin() )
		.pipe( gulp.dest( './dist/img' ) );
} );

// Image min
gulp.task( 'imagemin:misc', function() {
	return gulp.src( [
		'./assets/img/**/*',
		'!./assets/img/**/*.svg',
	] )
		.pipe( $.imagemin( [
			pngquant( {
				quality: [ .65, .8 ],
				speed: 1,
				floyd: 0,
			} ),
			mozjpeg( {
				quality: 85,
				progressive: true,
			} ),
			$.imagemin.svgo(),
			$.imagemin.optipng(),
			$.imagemin.gifsicle(),
		] ) )
		.pipe( gulp.dest( './dist/img' ) );
} );

// minify all images.
gulp.task( 'imagemin', gulp.parallel( 'imagemin:misc', 'imagemin:svg' ) );

//
// watch
// ================
//
gulp.task( 'watch', function() {
	// Make SASS
	gulp.watch( srcDir.scss, gulp.task( 'scss' ) );
	// Javascripts.
	gulp.watch( [
		'assets/js/**/*.js',
	], gulp.task( 'js' ) );
	// Minify Image
	gulp.watch( srcDir.img, gulp.task( 'imagemin' ) );
} );

// Build
gulp.task( 'build', gulp.parallel( 'js', 'scss', 'imagemin' ) );

// Default Tasks
gulp.task( 'default', gulp.parallel( 'watch' ) );

