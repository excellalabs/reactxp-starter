
const exec = require('child_process').exec

const avdmanager = `${process.env.ANDROID_HOME}/tools/bin/avdmanager`

function getAvdString() {
  return new Promise((resolve, reject) => {
    console.log('getting avd list...')
    exec(`${avdmanager} list avd`, (err, stdout, stderr) => {
      if(err) { console.log('ERROR!:', err); return reject(err) }
      if(stderr) { console.log('stderr:', stderr); return reject(stderr) }
      resolve(stdout)
    })
  })
}

function getValue(name, avd){
  var rgx = new RegExp(`${name}:([^:]+)\n`, 'im')
  var match = rgx.exec(avd)
  if(!match) { return null }
  return match[1].trim()
}

function parseAvdList(avdString) {
  var avdOptions = avdString.split('---------')
  if(avdOptions && avdOptions.length === 1){
    let opt = avdOptions[0]
    if(opt.length - opt.lastIndexOf(':') < 3){
      return []
    }
  }
  return avdOptions.map((avd) => {
    return {
      name: getValue('Name', avd),
      device: getValue('Device', avd),
      path: getValue('Path', avd),
      tag: getValue('Tag/ABI', avd),
      skin: getValue('Skin', avd),
      sd: getValue('Sdcard', avd)
    }
  })
}

function getAvdList() {
  return getAvdString().then(parseAvdList);
}

function getAvdListWhereApiAbove(minVersion){
  return getAvdList().then(list => list.filter((avd) => avd.api >= minVersion))
}

module.exports = {
  all: getAvdList,
  above: getAvdListWhereApiAbove
}
