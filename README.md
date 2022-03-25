## 安装方式
```js
npm i -g lanli-cli
```
## 创建项目
```js
lanli create projectname  // 默认从github上拉取
lanli create projectname -g   // 从github上拉取
lanli create projectname -l // 从缓存的模板中拉取
lanli create projectname -n=E:\MyProject\vite  // 从本机E:\MyProject\vite文件下拉取
```

## 命令
```js
lanli -V // 查看版本号
lanli -h // 查看命令说明
```

## lanli-cli源码
[lanli-cli](https://github.com/slailcp/lanli-cli)

## 版本更新记录
0.0.2  添加gulp-html模板，将html中的es6转成es5，然后打包到dist文件夹
0.0.3/0.0.4  添加gulp-react模板,将react插件打包成umd.js文件,可独立引用











