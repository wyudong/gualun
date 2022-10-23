const robot = require('robotjs')
const config = require('./config')

const { KEY_HOME } = config

module.exports.home = function () {
  robot.keyTap(KEY_HOME)
}
