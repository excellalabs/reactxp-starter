
const exec = require('child_process').exec

const IGNORE_TEXT = 'List of devices attached'

module.exports = function checkForConnectedDevice() {
  return new Promise((resolve, reject) => {
    exec('adb devices', (err, stdout, stderr) => {
      if(err) { return reject(err) }
      if(stderr) { return reject(stderr) }
      stdout = stdout.substring(IGNORE_TEXT.length)
      resolve(stdout.indexOf('device') >= 0)
    })
  })
}
