const robot = require('robotjs')
const config = require('./config')

const { KEY_FIRE } = config

module.exports.fire = function () {
  setTimeout(() => {
    robot.keyTap(KEY_FIRE)

    const now = new Date()
    console.log(`${now} use ${KEY_FIRE}`)
  }, 2000)
}
