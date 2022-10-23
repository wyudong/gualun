const robot = require('robotjs')
const config = require('./config')

const { KEY_SOS } = config

module.exports.sos = function () {
  robot.keyTap(KEY_SOS)
}
