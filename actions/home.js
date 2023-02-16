const robot = require('robotjs')
const config = require('../configs/settings')

const { KEY_HOME } = config

module.exports.home = () => {
  console.log(`press ${KEY_HOME}`)
  robot.keyTap(KEY_HOME)
}
