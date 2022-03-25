const {
  series,
  src,
  dest,
  parallel,
} = require('gulp');
const del = require('del'); // 删除文件

let cleanCSS = require('gulp-clean-css'); // 压缩css文件
var browserify = require('gulp-browserify'); // 浏览器使用 require,module.export

var rev = require('gulp-rev'); //  给静态资源文件名添加hash值:publich.css => publich-d41d8cd98f.css ,
var revCollector = require('gulp-rev-collector'); // 改变html引用路径,结合gulp-rev生成的rev/rev-manifest.json使用

var minifyHTML = require('gulp-minify-html'); // 压缩html页面

const less = require('gulp-less'); // less转css
var LessAutoprefix = require('less-plugin-autoprefix'); // css添加浏览器前缀
var autoprefix = new LessAutoprefix({
  browsers: ['last 2 versions']
});


const _del = (cb) => {
  del.sync(['dist/', 'rev/']);
  cb();
}

// 解析less
const _less = (cb) => {
  src('src/less/*.less')
    .pipe(rev()) // 生成路径地址在rev/**/rev-manifest.json.json文件里面 */
    .pipe(less({
      plugins: [autoprefix], // 添加前缀
    })) // less转成css
    .pipe(cleanCSS()) // 压缩css
    .pipe(dest('dist/less/'))
    .pipe(rev.manifest())
    .pipe(dest('rev/less/'));
  cb();
}

// es6转成es5相关,兼容require('./index.js')
const _scripts = (cd) => {
  src('src/js/*.js')
    .pipe(rev()) // 生成路径地址在rev/**/rev-manifest.json.json文件里面 */
    .pipe(browserify({ // require export
      insertGlobals: true,
      // debug: !env.production
    }))
    .pipe(dest('dist/js/'))
    .pipe(rev.manifest())
    .pipe(dest('rev/js/'));
  cd()
}


const _default = parallel((cb)=>{
  src(['src/**/*'])
  cb();
},_less, _scripts)

// 设置html里面的引用
const _rev = (cb) => {
  setTimeout(() => {
    src(['rev/**/*.json', 'src/**/*.html'])
      .pipe(
        revCollector({
          replaceReved: true,
          // dirReplacements: { // 设置路径
          //   "less": 'css', // 将页面引用的路径中less关键字换乘css
          //   '/cdn': function (manifest_value) { // 支持函数,
          //     console.log('manifest_value');
          //     console.log(manifest_value);
          //     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
          //   }
          // }
        })
      )
      .pipe(minifyHTML({ // minifyHTML: 压缩页面HTML
        // empty: true,
        // spare: true,
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
      }))
      .pipe(dest('dist'))
  }, 2000)
  cb()
}


exports.default = series(_del,_default, _rev);