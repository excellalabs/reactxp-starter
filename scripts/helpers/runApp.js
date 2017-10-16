
const spawn = require('child_process').spawn
const argv = require('yargs')
  .alias('p', 'port')
  .argv

const LOCAL_PORT = argv.port || 8081

const RUN_WAIT = 5000

module.exports = function runApp() {
  return new Promise((resolve, reject) => {
    spawn('npm', ['start', '--', '--port', `${LOCAL_PORT}`], { stdio: 'inherit' })
    setTimeout(() => {
      spawn('./node_modules/.bin/react-native', ['run-android'], { stdio: 'inherit' })
      setTimeout(() => {
        spawn('adb', ['reverse', 'tcp:8081', `tcp:${LOCAL_PORT}`], { stdio: 'inherit' })
        resolve()
      }, RUN_WAIT)
    }, RUN_WAIT)
  })
}
