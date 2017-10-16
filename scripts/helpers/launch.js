
const runEmulator = require('./runEmulator')
const runApp = require('./runApp')

module.exports = function launch(name) {
  return runEmulator(name).then(runApp)
}
