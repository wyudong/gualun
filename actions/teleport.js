const robot = require('robotjs')
const config = require('../configs/settings')

const { KEY_TELEPORT } = config

module.exports.teleport = () => {
  robot.keyTap(KEY_TELEPORT)
  console.log(`press ${KEY_TELEPORT}`)
}
