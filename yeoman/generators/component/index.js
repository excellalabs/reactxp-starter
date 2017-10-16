
var path = require('path')
var fs = require('fs')

var CopyTemplateGenerator = require('../../base/copyTemplateGenerator')

module.exports = class extends CopyTemplateGenerator {
  constructor(args, opts) {
    super(args, opts)
    this.argument('componentName', { type: String, required: true })
    this.option('rootDir', { desc: 'The source root directory', alias: 'r', type: String, default: 'src' })

    this.location = path.join(this.options.rootDir, 'components', this.options.componentName)
  }

  checkExistance () {
    if (fs.existsSync(this.location)) {
      return Promise.reject(`Error: Component ${this.options.componentName} already exists!`)
    }
  }

  copyFiles () {
    const templateDir = path.join(__dirname, 'templates')
    this.copyTemplateDirRecursive(templateDir, this.location)
  }
}
