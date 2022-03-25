var gulp = require('gulp')
var ts = require('gulp-typescript');
var path = require('path')
var less = require('gulp-less')
var babel = require('gulp-babel')
var del = require('del')
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');

var tsconfig = require('./tsconfig.json')
var LessAutoprefix = require('less-plugin-autoprefix'); // css添加浏览器前缀
var autoprefix = new LessAutoprefix({
  browsers: ['last 2 versions']
});

function buildStyle() {
  return gulp
    .src('./src/**/*.less')
    .pipe(
      less({
        paths: [path.join(__dirname, 'src')],
        relativeUrls: true,
      })
    )
    .pipe(less({
      plugins: [autoprefix], // 添加前缀
    }))
    .pipe(gulp.dest('tempes'))
}

function tsTransEs() {
  return gulp.src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/demo/**/*'],
    })
    .pipe(ts({
      ...tsconfig.compilerOptions,
      module: 'ESNext', //（字符串）- 指定模块代码生成：'commonjs'、'amd'、'umd'、'ESNext' 或 'system'。
      jsx: "react", //（字符串）- 指定 jsx 代码生成：'react' 或 'preserve' (TS1.6+)。
      moduleResolution: "node",
    }))
    .pipe(
      babel({
        'plugins': [() => {
          return {
            visitor: {
              ImportDeclaration(path, source) {
                if (path.node.source.value.endsWith('.less')) {
                  path.node.source.value = path.node.source.value.replace(
                    /\.less$/,
                    '.css'
                  )
                }
              },
            },
          }
        }] // 将页面上引入的.less文件后缀名改成.css
      })
    )
    .pipe(gulp.dest('tempes/'))
}


function gwebpack() {
  return gulp.src("tempes/index.js")
    .pipe(gulpWebpack({
        output: {
          filename: 'lanli-ui.js',
          library: {
            type: 'umd',
            name: 'lanliUI',
          },
        },
        mode: 'production',
        optimization: {
          usedExports: true,
        },
        module: {
          rules: [

            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(png|svg|jpg|gif|jpeg)$/,
              type: 'asset/inline',
            },
          ]
        },
        externals: [{
          'react': 'React',
          'react-dom': 'ReactDOM',
        }, ],
      },
      webpack))
    .pipe(
      gulp.dest('dist/')
    )
}


function copyAssets() {
  return gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('tempes/assets'))
    .pipe(gulp.dest('dist/assets'))
}

exports.default = gulp.series(
  () => del(['./tempes/**', './dist/**']),
  copyAssets,
  buildStyle,
  tsTransEs,
  gwebpack,
  () => del(['./tempes'])
)