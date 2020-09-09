// Requiring gulp
const { series, src, dest, watch, task } = require('gulp');
const gulp = require('gulp');


// Plugins
const newer = require('gulp-newer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const notify = require('gulp-notify');

const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

// Paths
const scriptPath = 'scripts/';
const stylesPath = 'styles/';
const outputPath = 'assets/';



/**
 * Javascript
 */

// Concatenate and uglify js. Move to /dist/
function scripts() {
    return src([scriptPath + '*.js', scriptPath + 'page/*.js', scriptPath + 'vendor/*.js', scriptPath + 'animation/*.js'])
        .pipe(sourcemaps.init())
        // .pipe(babel({
        // presets: ['@babel/preset-env'],
        // }))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe( dest(outputPath + 'js/') )
        .pipe( notify({ message: '\n\n✅  ===> Javascript concatenated and minified!\n', onLast: true }) );
};



/**
 * CSS
 */

// Compile SASS to CSS. Writes a sourcemap. Autoprefix.
// Minify CSS. Add suffix '.min'. Move to /css/min
function styles() {
    return src(stylesPath + 'styles.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass().on('error', sass.logError) )
        .pipe( cleanCSS({compatibility: 'ie8'}) )
        .pipe( autoprefixer() )
        .pipe( rename(function(path) {
            return {
                dirname: path.dirname,
                basename: 'application',
                extname: '.scss.liquid',
            };
        }))
        .pipe( sourcemaps.write('./') )
        .pipe( dest(outputPath) )
        .pipe( notify({ message: '\n\n✅  ===> SASS compiled, modernized and minified!\n', onLast: true }) );
};


/**
 * Watch
 */

 // Watch all sass files
 watch([stylesPath + '**/*.scss', stylesPath + 'styles.scss'], styles);

 // Watch js files, ignoring subfolders
 watch([scriptPath + '*.js'], scripts);

/**
 * Create gulp commands
 */

exports.scripts = scripts;
exports.styles = styles;
// exports.default = series(scripts, styles);
exports.default = series(styles);