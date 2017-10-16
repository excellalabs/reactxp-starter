
var Generator = require('yeoman-generator')
var ejs = require('ejs')
var path = require('path')
var fs = require('fs')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.on('error', (err) => {
      if (err) {
        console.error(err)
      }
      
      process.exit(1)
    })
  }

  copyTemplateDirRecursive (location, relative = '.') {
    fs.mkdirSync(path.join(relative))
    const children = fs.readdirSync(location)
    children.forEach(child => {
      const fullPath = path.join(location, child)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        this.copyTemplateDirRecursive(fullPath, path.join(relative, child))
      } else if (child.endsWith('.ejs')) {
        this.copyTemplate(fullPath, relative)
      } else {
        this.copyFile(fullPath, relative)
      }
    })
  }

  copyTemplate (file, relativePath) {
    const templateString = fs.readFileSync(file).toString()
    const content = ejs.compile(templateString)(this)
    this.writeFile(path.basename(file, '.ejs'), content, relativePath)
  }

  copyFile (file, relativePath) {
    const content = fs.readFileSync(file).toString()
    this.writeFile(path.basename(file), content, relativePath)
  }

  writeFile (filename, content, relativePath) {
    filename = filename.replace(/componentName/, this.options.componentName)
    const fullPath = path.join(relativePath, filename)
    console.log(`Writing ${fullPath} ...`)
    fs.writeFileSync(fullPath, content)
  }
}