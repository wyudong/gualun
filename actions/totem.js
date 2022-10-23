const robot = require('robotjs')
const config = require('./config')

const { KEY_TOTEM } = config

module.exports.fire = function () {
  setTimeout(() => {
    robot.keyTap(KEY_TOTEM)

    const now = new Date()
    console.log(`${now} use ${KEY_TOTEM}`)
  }, 2000)
}
