const path = require('path')
const fs = require('fs')
const appDir = path.resolve(__dirname, '..')

module.exports = function (root = 'public', ...to) {
    to = to.reduce((curPath, child) => path.join(curPath, child), root)
    const absolutePath = path.join(appDir, to)
    try {
      fs.accessSync(to)
    } catch (e) {
      to.split(path.sep).reduce((curPath, dirName) => {
        curPath = path.resolve(curPath, dirName)
        fs.mkdirSync(curPath, { recursive: true })
        return curPath
      }, appDir)
    }
    return function(req, res, next) {
      req.pathDir = absolutePath
      next()
    }
}
