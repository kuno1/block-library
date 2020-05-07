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
gulp.task( 'scss:lint', ( done ) => {
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

gulp.task( 'scss:generate', () => {
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
// JavaScripts
// ===================
//
gulp.task( 'js:compile', () => {
	const tmp = {};
	return gulp.src( [
		'./assets/js/**/*.js',
	] )
		.pipe( $.plumber( {
			errorHandler: $.notify.onError( '<%= error.message %>' ),
		} ) )
		.pipe( named() )
		.pipe( $.rename( ( path ) => {
			tmp[ path.basename ] = path.dirname;
		} ) )
		.pipe( webpack( require( './webpack.config.js' ), webpackBundle ) )
		.pipe( $.rename( ( path ) => {
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
gulp.task( 'js:eslint', () => {
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
gulp.task( 'imagemin:svg', () => {
	return gulp.src( './assets/img/**/*.svg' )
		.pipe( $.svgmin() )
		.pipe( gulp.dest( './dist/img' ) );
} );

// Image min
gulp.task( 'imagemin:misc', () => {
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
gulp.task( 'watch', ( done ) => {
	// Make SASS
	gulp.watch( srcDir.scss, gulp.task( 'scss' ) );
	// Javascripts.
	gulp.watch( [
		'assets/js/**/*.js',
	], gulp.task( 'js' ) );
	// Minify Image
	gulp.watch( srcDir.img, gulp.task( 'imagemin' ) );
	done();
} );

// Build
gulp.task( 'build', gulp.parallel( 'js', 'scss', 'imagemin' ) );

// Default Tasks
gulp.task( 'default', gulp.parallel( 'watch' ) );

// Generate doc for README.md
gulp.task( 'doc', ( done ) => {

	const searchPhp = ( blockName ) => {
		blockName = blockName.replace( 'kunoichi/', '' );
		for ( const file of fs.readdirSync( 'src/Kunoichi/BlockLibrary/Blocks' ) ) {
			const path = `./src/Kunoichi/BlockLibrary/Blocks/${ file }`;
			const name = file.replace( '.php', '' );
			const php = fs.readFileSync( path ).toString();
			if ( new RegExp( '\\$block_name = \'' + blockName + '\'' ).test( php ) ) {
				return {
					name,
					path,
				};
			}
		}
		return null;
	};

	const blocks = [];
	for ( const file of fs.readdirSync( './assets/js/blocks' ) ) {
		const path = `./assets/js/blocks/${ file }`;
		let fileContent = fs.readFileSync( path ).toString().split( 'registerBlockType' );
		if ( 3 > fileContent.length ) {
			continue;
		}
		fileContent = fileContent.slice( 2, fileContent.length );
		for ( const block of fileContent ) {
			// Extract name.
			if ( ! block.match( /^\( ?'([^']+)'/ ) ) {
				continue;
			}
			const blockName = RegExp.$1;
			// Extract Title.
			if ( ! block.match( /title: ?__\( '(.*)', 'kbl' \),?$/m ) ) {
				continue;
			}
			const title = RegExp.$1;
			// Extract Description.
			let desc = '';
			if ( block.match( /description: ?__\( '(.*)', 'kbl' \),?$/m ) ) {
				desc = RegExp.$1;
			}
			// Extract parent if exists.
			const parents = [];
			if ( block.match( /parent: \[(.*)],?$/m ) ) {
				RegExp.$1.split( ',' ).map( ( parent ) => {
					parents.push( parent.trim().replace( /'/mg, '' ) );
				} ).filter( obj => !! obj );
			}
			// Detect if is dynamic.
			let serverSide = false;
			let renderer = null;
			if ( block.match( /ServerSideRender/ ) ) {
				serverSide = true;
				renderer = searchPhp( blockName );
			}
			blocks.push( {
				blockName,
				title,
				desc,
				parents,
				serverSide,
				renderer,
			} );
		}
	}
	if ( ! blocks.length ) {
		console.error( 'No blocks found. Extractor might be broken.' );
	}
	console.log( `${ blocks.length } blocks are available.` + "\n\n" );
	console.log( blocks.map( ( block ) => {
		const row = [ `#### ${ block.title } \`${ block.blockName }\`` ];
		row.push( block.desc || 'No description provided.' );
		if ( block.parents.length ) {
			row.push( '*Parents*: available only in ' + block.parents.map( ( parent ) => '`' + parent + '`' ) . join( ', ' ) )
		}
		if ( block.serverSide ) {
			row.push( `*Dynamic Block*: see [${ block.renderer.name }](${ block.renderer.path })` );
		}
		return row.join( "  \n" );
	} ).join( "\n\n" ) );
	done();
} );
