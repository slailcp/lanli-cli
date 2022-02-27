const ora = require('ora')
const inquirer = require('inquirer')
const download = require("download-git-repo")
const fs = require('fs-extra'); // 传统fs复制文件目录需要加很多判断比较麻烦,fs-extra解决了这个问题
const path = require('path')
const { chooseList } = require('./config'); // 可选的模板

const spinner = ora('fetching template....')

const TemplateSuccess = (projectName) => {
  console.log(`"${projectName}" project created successfully.`)

}
const localTemplate = async (projectName, option2) => {
  // 从本地 下载模板lanli-cli create newtemplate --local 然后选择对应的模板名称
  let {
    choose
  } = await inquirer.prompt([{
    name: 'choose', // 获取选择后的结果
    type: 'list',
    message: 'please choise a template to create project',
    choices: chooseList
  }])

  spinner.start()
  await fs.copySync(path.resolve(__dirname, '../templates', choose), `./${projectName}`)
  spinner.succeed()

  TemplateSuccess(projectName)
}


const gitTemplate = async (projectName, option2) => {
  let {
    choose
  } = await inquirer.prompt([{
    name: 'choose', // 获取选择后的结果
    type: 'list',
    message: 'please choise a template to create project',
    choices: chooseList
  }])

  spinner.start()
  download('https://github.com:slailcp/lanli-cli#master', `./${projectName}`, {
    map: file => {
      file.path = file.path.replace(`templates\\${choose}`, '')
      return file
    },
    filter: file => {
      return file.path.indexOf(`templates\\${choose}`) != -1
    }
  }, function (err) {
    spinner.succeed()
    if (err) {
      console.error(err)
      return
    };
    TemplateSuccess(projectName)
  })
}

const nativeTepmlate = async (projectName, option2) => {
  /* 从 本地设置路径 lanli-cli create newtemplate --native-path=E:\MyProject\vite 
  或者
  lanli-cli create newtemplate -n=E:\MyProject\vite
  */
  let path = option2.nativePath

  if (path.indexOf('=') == 0) { path = path.replace(/\=/, '') } // 去掉=
  try {
    spinner.start()
    await fs.copySync(path, `./${projectName}`); // 直接将设置的路径复制过去
    spinner.succeed()
    TemplateSuccess(projectName)
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  create: async (projectName, option1, option2) => {
    if (projectName.indexOf('-') == 0) {
      console.error('The name cannot be preceded by "-"')
      return;
    }
    if (option2.local) {
      localTemplate(projectName, option2)
    } else if (option2.nativePath) {
      nativeTepmlate(projectName, option2)
    } else { // 从 git 下载模板
      gitTemplate(projectName, option2)
    }
  }
}
