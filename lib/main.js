const axios = require('axios')
const ora = require('ora')
const inquirer = require('inquirer')
const download = require("download-git-repo")
const fs = require('fs-extra'); // 传统fs复制文件目录需要加很多判断比较麻烦,fs-extra解决了这个问题

const path = require('path')

const spinner = ora('fetching template....')

// 1) 获取项目列表
const fetchRepoList = async () => {
  let {
    data
  } = await axios.get("http://192.168.2.67:2255/api/UserGet")
  return data
}


const localTemplate = async (projectName, option2) => {
  // 获取项目的所有模板
  spinner.start()
  let chooseList = await fetchRepoList()
  spinner.succeed()

  let {
    choose
  } = await inquirer.prompt([{
    name: 'choose', // 获取选择后的结果
    type: 'list',
    message: 'please choise a template to create project',
    choices: chooseList
  }])

  spinner.start()
  await fs.copySync(path.resolve(__dirname, '../templates', choose), `../${projectName}`)
  spinner.succeed()

  console.succeed(`"${projectName}" project created successfully.`)
}


const gitTemplate = async (projectName, option2) => {
  // 获取项目的所有模板
  spinner.start()
  let chooseList = await fetchRepoList()
  spinner.succeed()

  let {
    choose
  } = await inquirer.prompt([{
    name: 'choose', // 获取选择后的结果
    type: 'list',
    message: 'please choise a template to create project',
    choices: chooseList
  }])

  spinner.start()
  download('https://github.com:slailcp/lanli-cli#master', 'gittemplates/vue2+ts', {
    map: file => {
      console.log(file);
      return file;
    },
    filter: file => file.path.indexOf(`templates/${choose}/`) > -1
  }, function (err) {
    spinner.succeed()
    console.log(err ? 'Error' : 'Success')
    console.succeed(`"${projectName}" project created successfully.`)

  })
}



// 可能还需要用户配置一些数据 来结合渲染我的项目
module.exports = {
  create: async (projectName, option1, option2) => {
    if (projectName.indexOf('-') == 0) {
      console.error('The name cannot be preceded by "-"')
      return;
    }

    if (option2.local) {
      // 从本地 下载模板lanli-cli create newtemplate --local 然后选择对应的模板
      localTemplate(projectName, option2)
    } else if (option2.nativePath) {
      /* 从 本地设置路径 lanli-cli create newtemplate --native-path=E:\MyProject\vite 
      或者
      lanli-cli create newtemplate -n=E:\MyProject\vite
      */
      fs.copySync(option2.nativePath, `../${projectName}`); // 直接将设置的路径复制过去
    } else { // 从 git 下载模板
      console.log(option2);
      console.log('git下载');
    }



    // // 输入的是--git | --local等命令
    // if (projectName.indexOf('-') == 0) {
    //   if (option1.git) { // git
    //     console.log(option1);
    //   } else if (option1.local) { // 本地 lanli-cli create -l=template
    //     console.log(option1);
    //   } else {
    //     console.error('The name cannot be preceded by "-"')
    //   }
    // } else { // 创建文件夹名字为projectName

    // }

    // if (option1.git) { // 从git下载

    // } else if (option1.local) { // 从本地下载
    //   // await fs.copySync()
    // } else {

    // }

    // console.log(projectName);
    // console.log(option1);
    // console.log(option2);

    // let {
    //   choose
    // } = await inquirer.prompt([{
    //   name: 'choose', // 获取选择后的结果
    //   type: 'list',
    //   message: 'please choise a template to create project',
    //   choices: chooseList
    // }])

    // console.log(choose)
  }
}
