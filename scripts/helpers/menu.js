
const chalk = require('chalk')
const createMenu = require('simple-terminal-menu')

const LINE_LENGTH = 73;
function writeTextMultiline(menu, lineLength, text) {
  text = text.trim()
  if(text.length <= lineLength) {
    menu.writeLine(text)
    return
  }
  let breakLineAt = text.lastIndexOf(' ', lineLength)
  if(breakLineAt === -1){
    breakLineAt = lineLength
  }
  let line = text.substring(0, breakLineAt)
  menu.writeLine(line)
  writeTextMultiline(menu, lineLength, text.substring(breakLineAt))
}

module.exports = function showMenu(title, text, menuActions, extraActions){
  extraActions = extraActions || [];
  let menu = createMenu({
    width: LINE_LENGTH,
    x: 2,
    y: 2
  });
  menu.writeTitle(title)
  writeTextMultiline(menu, LINE_LENGTH, text || '')
  menu.writeSeparator()
  menuActions.forEach(function(action){
    menu.add(chalk.bold('» ' + action[0]), action[1])
  });
  menu.writeSeparator()
  extraActions.forEach(function(action){
    menu.add(chalk.bold(action[0]), action[1])
  });
  return menu
}
