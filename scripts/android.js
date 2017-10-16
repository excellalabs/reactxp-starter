#!/usr/bin/env node

const showAvdMenu = require('./helpers/showAvdMenu')
const launch = require('./helpers/launch')
const runApp = require('./helpers/runApp')
const checkForDevice = require('./helpers/checkForDevice')
const argv = require('yargs').argv

main()

function main() {
  checkForSuppliedAvdName().then(cont => {
    if(cont){
      return tryRunningDevice()
    }
  }).then(cont => {
    if(cont){
      return showAvdMenu(avd => launch(avd.name))
    }
  })
}

function checkForSuppliedAvdName() {
  var avdName = argv._[0]
  if(avdName){
    launch(avdName)
  }
  return Promise.resolve(!avdName)
}

function tryRunningDevice(){
  return checkForDevice().then(isDeviceRunning => {
    if(isDeviceRunning){
      runApp()
    }
    return !isDeviceRunning
  })
}
