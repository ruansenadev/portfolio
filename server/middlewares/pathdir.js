const path = require('path')
const fs = require('fs')

module.exports = function (root = 'public', ...to) {
    to = to.reduce((curPath, child) => path.join(curPath, child), root)
    const absolutePath = path.resolve(__dirname, '..', to)
    try {
      fs.accessSync(to)
    } catch (e) {
      to.split(path.sep).reduce((curPath, dirName) => {
        curPath = path.resolve(curPath, dirName)
        fs.mkdirSync(curPath, { recursive: true })
        return curPath
      }, '')
    }
    return function(req, res, next) {
      req.pathDir = absolutePath
      next()
    }
}
