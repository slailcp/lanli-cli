#!/usr/bin/env node

const fs = require('fs')
const main = require('./main.js')
const commander = require('commander');
const program = new commander.Command();
const {
  version
} = require('../package.json')


const mapActions = {
  create: {
    alias: 'init',
    description: 'create a project',
    examples: [
      'lanli-cli create|init <project-name>',
      'lanli-cli create <project-name>',  // 默认从github上拉取
      'lanli-cli create <project-name> -g', // 从github上拉取
      'lanli-cli create <project-name> -l', // 从缓存的模板中拉取
      'lanli-cli create <project-name> -n=E:\MyProject\vite'  // 从本机E:\MyProject\vite文件下拉取
    ]
  },
  '*': {
    alias: '',
    description: 'command not found, You can try "lanli cli create <project-name>"',
    examples: []
  }
}
Reflect.ownKeys(mapActions).forEach(action => {
  program
    .command(action) // 配置命令的名字
    .alias(mapActions[action].alias) // 命令的别名
    .description(mapActions[action].description) // 命令对应的描述
    .option('-g, --git', 'Download template from Git')
    .option('-l, --local', 'Download template from Local')
    .option('-n, --native-path <path>', 'Download template from Local')
    .action((option1, option2, option3) => {
      if (action === '*') { // 访问不到对应的命令 就打印找不到命令
        console.log(mapActions[action].description)
      } else {
        if (fs.existsSync(action)) return log.error('Project already exists!!')
        // console.log(action);

        main[action](...process.argv.slice(3), option1, option2, option3)
      }
    })
})


// 监听用户输入--help
program.on('--help', function () {
  console.log('\nExamples:')
  Reflect.ownKeys(mapActions).forEach(action => {
    mapActions[action].examples.forEach(example => {
      console.log(`  ${example}`)
    })
  })
})

// 解析用户传递过来的参数
program.version(version).parse(process.argv)
