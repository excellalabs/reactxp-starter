
const menu = require('./menu')
const getAvdList = require('./getAvdList')

module.exports = function showAdvMenu(callback) {
  return getAvdList.all().then(list => {
    var menuItems = list.map(avd => [`${avd.name}`, () => callback(avd)])
    const avdMenu = menu('AVD Launcher', `Select an AVD to launch from the list below.`, menuItems, [
      ['Quit', () => quit(avdMenu)]
    ])
  })
}

function quit(avdMenu) {
  avdMenu.close()
  console.log('To add or edit an AVD, open Android Studio and go to: Tools -> Android -> AVD Manager')
  process.exit(0)
}
