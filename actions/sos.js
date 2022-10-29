const robot = require('robotjs')
const config = require('./config')

const { KEY_SOS } = config

module.exports.sos = () => {
  robot.keyTap(KEY_SOS)
  console.log(`press ${KEY_SOS}`)
}
