const robot = require('robotjs')
const config = require('../configs/settings')
const utils = require('./utils')

const { KEY_HOME, POS_HOME_CONFIRM, KEY_SIT } = config

module.exports.home = async () => {
  console.log(`press ${KEY_HOME}`)
  robot.keyTap(KEY_HOME)
  await utils.sleep(1000)
  robot.moveMouse(POS_HOME_CONFIRM.x, POS_HOME_CONFIRM.y)
  robot.mouseClick('left', false)
  await utils.sleep(3000)
  robot.keyTap(KEY_SIT)
}
