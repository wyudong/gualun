const robot = require('robotjs')
const config = require('./config')

const { KEY_SOS } = config

module.exports.fire = function () {
  robot.keyTap(KEY_SOS)
}
