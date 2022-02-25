const download = require("download-git-repo")
const path = require("path")


download('https://github.com:slailcp/lanli-cli#master', 'gittemplates/vue2+ts', {
  map: file => {
    console.log(file);
    return file;
  },
  filter: file => file.path.indexOf(`templates/vue2+vite/`) > -1
}, function (err) {
  console.log(err ? 'Error' : 'Success')
})

// download('direct:https://github.com/slailcp/lanli-cli/archive/refs/heads/master.zip', 'viewtemplates/vue2+ts', {
  
// }, function (err) {
//   console.log(err ? 'Error' : 'Success')
// })

