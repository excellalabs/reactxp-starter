
const path = require('path')
const child = require('child_process')
const through = require('through2')

module.exports = function runEmulator(name, detatched, wait) {
  const emuPromise = spawnEmulator(name, detatched)
  if (wait) {
    return emuPromise.then(waitForBoot)
  } else {
    return emuPromise
  }
}

function checkIfBootDone(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      child.exec('adb shell getprop init.svc.bootanim', (err, stdout, stderr) => {
        if(stdout.indexOf('stopped') >= 0){ return resolve(true) }
        resolve(false)
      })
    }, 2000);
  })
}

function waitForBoot() {
  console.log('waiting for AVD boot to finish...')
  return checkIfBootDone().then((done) => {
    if(!done) {
      return waitForBoot();
    }
    console.log('done booting!')
  })
}

const originalPath = process.cwd()
const emulatorPath = path.join(process.env.ANDROID_HOME, 'tools')

const startSignals = [
  'Your emulator is out of date',
  'Listening for console connections'
]

function spawnEmulator(name, detatched) {
  const resetDir = () => process.chdir(originalPath)

  return new Promise((resolve, reject) => {
    process.chdir(emulatorPath)
    let spawnOptions = { detached: detatched, stdio: 'ignore' }

    let emulator = child.spawn('emulator', ['-avd', name], spawnOptions)
    if (detatched) {
      emulator.unref()
    }
    emulator.stdout.pipe(through({ objectMode: true }, function(chunk, enc, cb) {
      var text = chunk.toString()
      if(startSignals.find(sig => text.indexOf(sig))){
        resolve()
      }
      this.push(chunk)
      cb()
    })).pipe(process.stdout)
    emulator.stderr.pipe(process.stderr)
  }).then(resetDir, resetDir)
}
